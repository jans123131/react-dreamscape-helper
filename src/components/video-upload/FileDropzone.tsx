import React from 'react';
import { Image, Video as VideoIcon } from 'lucide-react';

interface FileDropzoneProps {
  type: 'video' | 'thumbnail';
  file: File | null;
  onFileSelect: (file: File) => void;
  maxSize?: number;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  type,
  file,
  onFileSelect,
  maxSize
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File) => {
    if (!maxSize || selectedFile.size <= maxSize) {
      onFileSelect(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    handleFile(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const Icon = type === 'thumbnail' ? Image : VideoIcon;
  const text = type === 'thumbnail' 
    ? 'Glissez-déposez votre miniature ici ou cliquez pour sélectionner une miniature'
    : 'Glissez-déposez votre vidéo ici ou cliquez pour sélectionner un fichier';

  return (
    <div 
      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById(`${type}Input`)?.click()}
    >
      <Icon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <input
        type="file"
        id={`${type}Input`}
        onChange={handleFileChange}
        accept={type === 'thumbnail' ? 'image/*' : 'video/*'}
        className="hidden"
      />
      <p className="text-sm text-muted-foreground">{text}</p>
      {file && (
        <p className="mt-2 text-sm text-primary">{file.name}</p>
      )}
    </div>
  );
};