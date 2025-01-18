const imageCache = new Map<string, HTMLImageElement>();

export const preloadImage = (src: string): Promise<void> => {
  if (imageCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Set image loading attributes
    img.loading = 'lazy';
    img.decoding = 'async';
    
    // Add event listeners before setting src
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
    
    // Set source last
    img.src = src;
  });
};

export const getCachedImage = (src: string): HTMLImageElement | undefined => {
  return imageCache.get(src);
};

// Generate srcSet for responsive images
export const generateSrcSet = (src: string): string => {
  const sizes = [320, 640, 768, 1024, 1280];
  return sizes
    .map(size => `${src} ${size}w`)
    .join(', ');
};

// Clear cache when it gets too large
export const clearImageCache = () => {
  if (imageCache.size > 100) {
    imageCache.clear();
  }
};

// Preload multiple images in order of priority
export const preloadImages = async (srcs: string[], priority: boolean = false): Promise<void> => {
  const promises = srcs.map(src => {
    const img = new Image();
    img.fetchPriority = priority ? 'high' : 'auto';
    img.loading = priority ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.src = src;
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });
  });

  await Promise.all(promises);
};