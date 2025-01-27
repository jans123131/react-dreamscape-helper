import React from 'react';
import { FileVideo, ImageIcon, X } from 'lucide-react';
import { formatFileSize } from '@/utils/compression';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadBoxProps {
  type: 'video' | 'thumbnail';
  file: FileWithPreview | null;
  isCompressing: boolean;
  compressionProgress: number;
  originalSize: number | null;
  compressedSize: number | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove?: () => void;
}

export const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  type,
  file,
  isCompressing,
  compressionProgress,
  originalSize,
  compressedSize,
  onFileSelect,
  onFileRemove
}) => {
  const Icon = type === 'video' ? FileVideo : ImageIcon;
  const inputId = `${type}Input`;
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && type === 'video') {
      navigate('/app/compress');
    } else {
      onFileSelect(event);
    }
  };

  return (
    <div 
      className={`
        border-2 border-dashed border-border/40 rounded-lg p-6 text-center 
        cursor-pointer hover:bg-dashboard-background/50 transition-colors relative
        ${file ? 'bg-primary/5 border-primary/40' : ''}
        ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={() => !isCompressing && document.getElementById(inputId)?.click()}
    >
      {file && (
        <>
          {type === 'thumbnail' && file.preview ? (
            <img 
              src={file.preview} 
              alt="Aperçu de la miniature" 
              className="w-32 h-32 object-cover mx-auto rounded-lg"
            />
          ) : type === 'video' && file ? (
            <video 
              className="w-full max-w-[300px] mx-auto rounded-lg mb-4"
              controls
            >
              <source src={URL.createObjectURL(file)} type={file.type} />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          ) : null}

          {onFileRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFileRemove();
              }}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              disabled={isCompressing}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            <p className="font-medium truncate max-w-[200px] mx-auto">
              {file.name}
            </p>
            {originalSize && (
              <p className="mt-1">
                Taille originale: {formatFileSize(originalSize)}
                {compressedSize && (
                  <>
                    <br />
                    Taille compressée: {formatFileSize(compressedSize)}
                    <br />
                    Réduction: {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%
                  </>
                )}
              </p>
            )}
          </div>

          {isCompressing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Compression en cours...</span>
                <span>{compressionProgress.toFixed(0)}%</span>
              </div>
              <Progress value={compressionProgress} className="h-2" />
            </div>
          )}
        </>
      )}

      {!file && (
        <>
          <Icon className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isCompressing ? 'Compression en cours...' : `Déposez ${type === 'video' ? 'la vidéo' : 'la miniature'} ici ou cliquez pour parcourir`}
          </p>
        </>
      )}

      <input
        type="file"
        id={inputId}
        onChange={handleFileSelect}
        accept={type === 'thumbnail' ? 'image/*' : 'video/*'}
        className="hidden"
        disabled={isCompressing}
      />
    </div>
  );
};