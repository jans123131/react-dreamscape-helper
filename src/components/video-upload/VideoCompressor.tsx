import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Upload, FileVideo } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const VideoCompressor = () => {
  const [loaded, setLoaded] = useState(false); // Indique si FFmpeg est prêt
  const [video, setVideo] = useState<File | null>(null); // Vidéo sélectionnée
  const [progress, setProgress] = useState(0); // Progression de la compression
  const [compressing, setCompressing] = useState(false); // Compression en cours
  const [originalSize, setOriginalSize] = useState<number>(0); // Taille d'origine
  const [compressedSize, setCompressedSize] = useState<number>(0); // Taille compressée
  const [loadingMessage, setLoadingMessage] = useState('Chargement de FFmpeg...');
  const [detailedMessage, setDetailedMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Temps restant estimé
  const [compressionRatio, setCompressionRatio] = useState<number>(60); // Taux de compression par défaut à 60%

  const ffmpegRef = useRef<FFmpeg | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  let startTime: number | null = null;

  const loadFFmpeg = async () => {
    try {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      setLoadingMessage('Téléchargement de FFmpeg...');
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

      ffmpeg.on('log', ({ message }) => {
        console.log('FFmpeg Log:', message);
        setDetailedMessage(message);
      });

      ffmpeg.on('progress', ({ progress }) => {
        const percentage = Math.round(progress * 100);
        setProgress(percentage);
        setLoadingMessage(`Traitement : ${percentage}%`);

        // Calcul du temps restant
        if (!startTime) {
          startTime = Date.now();
        } else {
          const elapsedTime = (Date.now() - startTime) / 1000; // Temps écoulé en secondes
          const estimatedTotalTime = (elapsedTime / progress) * 1.0; // Proportion simple
          setTimeLeft(Math.max(0, Math.round(estimatedTotalTime - elapsedTime)));
        }
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setLoaded(true);
      setLoadingMessage('');
    } catch (error) {
      console.error('Erreur lors du chargement de FFmpeg:', error);
      setLoadingMessage('Impossible de charger FFmpeg. Veuillez actualiser et réessayer.');
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Échec du chargement de FFmpeg. Veuillez réessayer.',
      });
    }
  };

  useEffect(() => {
    loadFFmpeg();
    return () => {
      ffmpegRef.current?.terminate();
    };
  }, []);

  const compressVideo = async (file: File) => {
    const ffmpeg = ffmpegRef.current;
    if (!loaded || !ffmpeg) {
      toast({
        title: 'Pas prêt',
        description: 'Veuillez attendre que FFmpeg soit chargé.',
      });
      return;
    }

    try {
      setCompressing(true);
      setProgress(0);
      setLoadingMessage('Préparation de la vidéo...');
      setDetailedMessage('Chargement et analyse du fichier vidéo...');

      await ffmpeg.writeFile('input.mp4', await fetchFile(file));

      setLoadingMessage('Compression de la vidéo...');
      setDetailedMessage('Application des paramètres de compression...');

      // Le CRF (Constant Rate Factor) détermine la qualité de la compression, 
      // plus le CRF est élevé, plus la compression est forte (qualité plus faible)
      const crfValue = 30 + (100 - compressionRatio); // Plus faible CRF pour une compression plus élevée

      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-c:v', 'libx264',
        '-crf', crfValue.toString(),
        '-preset', 'medium', // Équilibre entre vitesse et qualité
        '-c:a', 'aac',
        '-b:a', '128k', // Meilleure qualité audio
        '-vf', `scale=iw*${compressionRatio / 100}:-2`, // Réduction de l'échelle selon le taux de compression
        '-y',
        'output.mp4',
      ]);

      setLoadingMessage('Finalisation...');
      setDetailedMessage('Lecture du fichier compressé...');

      const data = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data], { type: 'video/mp4' });
      setCompressedSize(blob.size);

      const compressedFile = new File([blob], file.name, { type: 'video/mp4' });

      localStorage.setItem('compressedVideo', JSON.stringify({
        name: compressedFile.name,
        size: compressedFile.size,
        type: compressedFile.type,
        lastModified: compressedFile.lastModified,
      }));

      localStorage.setItem('compressedVideoBlob', URL.createObjectURL(blob));

      setProgress(100);
      setLoadingMessage('Compression terminée !');
      setDetailedMessage('La vidéo a été compressée avec succès.');
      toast({
        title: 'Succès',
        description: 'Vidéo compressée avec succès ! Redirection...',
      });

      setTimeout(() => {
        navigate('/app/upload');
      }, 1500);
    } catch (error) {
      console.error('Erreur lors de la compression:', error);
      setLoadingMessage('Erreur lors de la compression de la vidéo. Veuillez réessayer.');
      setDetailedMessage('Une erreur inattendue s\'est produite.');
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de compresser la vidéo. Veuillez réessayer.',
      });
    } finally {
      setCompressing(false);
    }
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setOriginalSize(file.size);
      setCompressedSize(0);
      setProgress(0);
      setLoadingMessage('');
      setDetailedMessage('');
    }
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Octets';
    const k = 1024;
    const sizes = ['Octets', 'Ko', 'Mo', 'Go'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="text-center mb-6">
          <FileVideo className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Compresseur de Vidéos</h1>
          <p className="text-gray-600 mt-2">{loadingMessage}</p>
          <p className="text-sm text-gray-500 mt-1">{detailedMessage}</p>
        </div>

        <div className="space-y-6">
          <label className="block">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="video-input"
              disabled={!loaded || compressing}
            />
            <label
              htmlFor="video-input"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer"
            >
              <Upload className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-gray-700">Télécharger une vidéo</span>
            </label>
          </label>

          {video && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taille d'origine : {formatSize(originalSize)}</span>
                {compressedSize > 0 && (
                  <span>Taille compressée : {formatSize(compressedSize)}</span>
                )}
              </div>

              {/* Compression Ratio Slider */}
              <div>
                <label className="block text-sm text-gray-600">Taux de Compression</label>
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={compressionRatio}
                  onChange={(e) => setCompressionRatio(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1%</span>
                  <span>90%</span>
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Compression approximative : {compressionRatio}% de qualité
                </div>
              </div>

              {(compressing || progress > 0) && (
                <div>
                  <Progress value={progress} />
                  <div className="text-center text-sm text-gray-500 mt-2">{progress}% complété</div>
                  {timeLeft !== null && compressing && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Temps restant estimé : {timeLeft}s
                    </p>
                  )}
                </div>
              )}

              <Button
                onClick={() => video && compressVideo(video)}
                disabled={compressing || !loaded}
                className="w-full"
              >
                  {compressing ? 'Compression en cours...' : 'Compresser la Vidéo'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCompressor;
