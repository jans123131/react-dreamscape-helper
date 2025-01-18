// Cache for storing preloaded resources
const resourceCache = new Map<string, HTMLImageElement | HTMLVideoElement>();

// Function to preload an array of images
export const preloadImages = async (imagePaths: string[]): Promise<void> => {
  const preloadPromises = imagePaths.map(path => {
    if (resourceCache.has(path)) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.fetchPriority = 'high';
      img.decoding = 'async';
      
      img.onload = () => {
        resourceCache.set(path, img);
        resolve();
      };
      img.onerror = reject;
    });
  });

  await Promise.all(preloadPromises);
};

// Function to preload videos
export const preloadVideos = async (videoPaths: string[]): Promise<void> => {
  const preloadPromises = videoPaths.map(path => {
    if (resourceCache.has(path)) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = path;
      
      video.onloadeddata = () => {
        resourceCache.set(path, video);
        resolve();
      };
      video.onerror = reject;
    });
  });

  await Promise.all(preloadPromises);
};

// Function to check if a resource is cached
export const isResourceCached = (path: string): boolean => {
  return resourceCache.has(path);
};

// Function to get a cached resource
export const getCachedResource = (path: string): HTMLImageElement | HTMLVideoElement | undefined => {
  return resourceCache.get(path);
};

// Function to preload the next set of resources based on current route
export const preloadNextResources = async (currentPath: string) => {
  // Define resources to preload based on current route
  const resourceMap: Record<string, { images: string[]; videos: string[] }> = {
    '/': {
      images: ['banner.png', 'banner2.png', 'banner3.png'],
      videos: []
    },
    '/product': {
      images: [], // Will be populated dynamically based on visible products
      videos: []
    }
    // Add more routes as needed
  };

  const resources = resourceMap[currentPath] || { images: [], videos: [] };
  
  try {
    await Promise.all([
      preloadImages(resources.images),
      preloadVideos(resources.videos)
    ]);
    console.log('Preloaded resources for path:', currentPath);
  } catch (error) {
    console.error('Error preloading resources:', error);
  }
};