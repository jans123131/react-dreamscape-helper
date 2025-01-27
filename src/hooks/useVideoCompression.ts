import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useToast } from '@/hooks/use-toast';

export const useVideoCompression = () => {
  const [loaded, setLoaded] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading FFmpeg...');
  const ffmpegRef = useRef(new FFmpeg());
  const { toast } = useToast();

  useEffect(() => {
    loadFFmpeg();
    return () => {
      const ffmpeg = ffmpegRef.current;
      if (ffmpeg) {
        ffmpeg.terminate();
      }
    };
  }, []);

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    try {
      console.log('Loading FFmpeg...');
      setLoadingMessage('Downloading FFmpeg...');
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      
      ffmpeg.on('log', ({ message }) => {
        console.log('FFmpeg Log:', message);
      });

      ffmpeg.on('progress', ({ progress, time }) => {
        const percentage = Math.round(progress * 100);
        console.log('Compression progress:', percentage);
        setCompressionProgress(percentage);
        setLoadingMessage(`Processing: ${percentage}% (${(time / 1000000).toFixed(1)}s)`);
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      setLoaded(true);
      setLoadingMessage('');
      console.log('FFmpeg loaded successfully');
    } catch (error) {
      console.error('Error loading FFmpeg:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load video compression. Please refresh and try again."
      });
    }
  };

  const handleFileCompression = async (file: File, type: 'video' | 'thumbnail') => {
    if (type === 'thumbnail') return file;
    if (!loaded) {
      toast({
        title: "Please wait",
        description: "Video compression is still loading..."
      });
      return null;
    }

    const ffmpeg = ffmpegRef.current;
    setIsCompressing(true);
    setOriginalSize(file.size);
    setCompressionProgress(0);
    setLoadingMessage('Preparing video...');

    try {
      console.log('Starting video compression...');
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));
      
      setLoadingMessage('Compressing video...');
      
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-c:v', 'libx264',         // Video codec
        '-crf', '32',              // Higher CRF = more compression
        '-preset', 'veryfast',     // Much faster encoding
        '-tune', 'fastdecode',     // Optimize for fast decoding
        '-movflags', '+faststart', // Enable fast start for web playback
        '-c:a', 'aac',            // Audio codec
        '-b:a', '96k',            // Reduced audio bitrate
        '-ac', '1',               // Convert to mono audio
        '-vf', 'scale=iw*0.8:-2', // Reduce resolution by 20%
        '-r', '24',               // Limit framerate to 24fps
        '-y',                     // Overwrite output files
        'output.mp4'
      ]);

      setLoadingMessage('Finalizing...');
      const data = await ffmpeg.readFile('output.mp4');
      const compressedBlob = new Blob([data], { type: 'video/mp4' });
      setCompressedSize(compressedBlob.size);
      
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'video/mp4',
      });

      console.log('Compression complete', {
        originalSize: file.size,
        compressedSize: compressedFile.size,
        reduction: ((file.size - compressedFile.size) / file.size * 100).toFixed(1) + '%'
      });

      setLoadingMessage('Compression complete!');
      setCompressionProgress(100);
      
      return compressedFile;
    } catch (error) {
      console.error('Error during compression:', error);
      toast({
        variant: "destructive",
        title: "Compression Error",
        description: "Failed to compress video. Please try again."
      });
      return null;
    } finally {
      setIsCompressing(false);
    }
  };

  return {
    isCompressing,
    originalSize,
    compressedSize,
    compressionProgress,
    loadingMessage,
    handleFileCompression
  };
};