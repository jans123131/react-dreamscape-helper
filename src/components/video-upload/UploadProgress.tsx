import React from 'react';
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  progress: number;
  uploadedMB: number;
  totalMB: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  uploadedMB,
  totalMB
}) => {
  return (
    <div className="space-y-2">
      <Progress value={progress} />
      <p className="text-sm text-center text-muted-foreground">
        {progress}% ({uploadedMB} MB / {totalMB} MB)
      </p>
    </div>
  );
};