import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FileWithPreview extends File {
  preview?: string;
}

export const useVideoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<FileWithPreview | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubchapter, setSelectedSubchapter] = useState('');
  const { toast } = useToast();

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadProgress(0);
    setSelectedChapter('');
    setSelectedSubchapter('');
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Titre requis",
        description: "Veuillez entrer un titre pour la vidéo"
      });
      return false;
    }

    if (!selectedChapter || !selectedSubchapter) {
      toast({
        variant: "destructive",
        title: "Sélection requise",
        description: "Veuillez sélectionner une saison et un chapitre"
      });
      return false;
    }

    if (!videoFile) {
      toast({
        variant: "destructive",
        title: "Vidéo requise",
        description: "Veuillez sélectionner une vidéo à télécharger"
      });
      return false;
    }

    if (!thumbnailFile) {
      toast({
        variant: "destructive",
        title: "Miniature requise",
        description: "Veuillez sélectionner une image miniature"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('id_saison', selectedChapter);
    formData.append('id_chapter', selectedSubchapter);

    try {
      const response = await fetch('https://plateform.draminesaid.com/app/uploadnew.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Succès",
          description: "Vidéo téléchargée avec succès"
        });
        resetForm();
      } else {
        throw new Error(data.message || 'Échec du téléchargement');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec du téléchargement",
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    videoFile,
    setVideoFile,
    thumbnailFile,
    setThumbnailFile,
    uploadProgress,
    setUploadProgress,
    isUploading,
    selectedChapter,
    setSelectedChapter,
    selectedSubchapter,
    setSelectedSubchapter,
    handleSubmit,
    resetForm
  };
};