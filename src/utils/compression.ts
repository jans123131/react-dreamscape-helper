import imageCompression from 'browser-image-compression';

export const compressImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<File> => {
  if (!file || file.type.split('/')[0] !== 'image') {
    throw new Error('Invalid file type. Please upload an image file.');
  }

  try {
    console.log('[Image Compression] Starting...', {
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      fileType: file.type,
      timestamp: new Date().toISOString(),
    });

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: onProgress
        ? (progress: number) => {
            const roundedProgress = Math.round(progress * 100);
            console.log(`[Image Compression] Progress: ${roundedProgress}%`);
            onProgress(roundedProgress);
          }
        : undefined,
    };

    const compressedFile = await imageCompression(file, options);

    console.log('[Image Compression] Completed.', {
      originalSize: formatFileSize(file.size),
      compressedSize: formatFileSize(compressedFile.size),
      compressionRatio: `${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`,
      timestamp: new Date().toISOString(),
    });

    return compressedFile;
  } catch (error) {
    console.error('[Image Compression] Failed:', error);
    throw error;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};