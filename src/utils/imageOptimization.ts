// Cache for storing preloaded images
const imageCache = new Map<string, HTMLImageElement>();

export const preloadImage = (src: string): Promise<void> => {
  if (imageCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.fetchPriority = 'high';
    img.decoding = 'async';
    
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
  });
};

export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = src;
    
    video.onloadeddata = () => resolve();
    video.onerror = reject;
  });
};

export const getCachedImage = (src: string): HTMLImageElement | undefined => {
  return imageCache.get(src);
};

// Helper to generate srcSet for responsive images
export const generateSrcSet = (src: string): string => {
  const sizes = [320, 640, 768, 1024, 1280];
  return sizes
    .map(size => `${src} ${size}w`)
    .join(', ');
};