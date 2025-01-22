import { ProductTemplate } from '@/types/personalization';

export const productTemplates: Record<string, ProductTemplate> = {
  tshirt: {
    id: 'tshirt',
    name: 'T-Shirt',
    backgroundImage: '/images/tshirtplaceholder.png',
    naturalWidth: 800,
    naturalHeight: 1000,
    safeZones: [
      {
        x: 200,
        y: 200,
        width: 400,
        height: 500,
        shape: 'rectangle'
      }
    ]
  },
  mug: {
    id: 'mug',
    name: 'Tasse',
    backgroundImage: '/images/mugplaceholder.png',
    naturalWidth: 600,
    naturalHeight: 400,
    safeZones: [
      {
        x: 100,
        y: 50,
        width: 400,
        height: 280,
        shape: 'polygon',
        points: [
          [100, 50],
          [500, 80],
          [480, 330],
          [80, 300]
        ]
      }
    ]
  }
};

export const getProductTemplate = (productType: string): ProductTemplate | undefined => {
  return productTemplates[productType];
};