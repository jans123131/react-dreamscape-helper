import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { UploadProgress } from './UploadProgress';
import { uploadVideo } from './uploadUtils';

interface UploadFormProps {
  userEmail: string;
}

export const UploadForm: React.FC<UploadFormProps> = ({ userEmail }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedMB, setUploadedMB] = useState(0);
  const [totalMB, setTotalMB] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!videoFile || !thumbnailFile) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: 'Veuillez sélectionner un fichier vidéo et une miniature à télécharger.'
      });
      return;
    }

    setIsUploading(true);
    try {
      await uploadVideo({
        videoFile,
        thumbnailFile,
        title,
        description,
        userEmail,
        onProgress: (progress, uploaded, total) => {
          setUploadProgress(progress);
          setUploadedMB(uploaded);
          setTotalMB(total);
        }
      });
      
      toast({
        title: "Succès",
        description: 'Vidéo téléchargée avec succès !'
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors du téléchargement."
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Télécharger une Nouvelle Vidéo</h2>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre</label>
              <Input
                type="text"
                placeholder="Titre de la Vidéo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Description de la Vidéo"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <FileDropzone
            type="thumbnail"
            file={thumbnailFile}
            onFileSelect={setThumbnailFile}
          />

          <FileDropzone
            type="video"
            file={videoFile}
            onFileSelect={setVideoFile}
            maxSize={2147483648}
          />

          {isUploading && (
            <UploadProgress
              progress={uploadProgress}
              uploadedMB={uploadedMB}
              totalMB={totalMB}
            />
          )}

          <Button
            type="submit"
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Téléchargement en cours...' : 'Télécharger la Vidéo'}
          </Button>
        </form>
      </div>
    </Card>
  );
};