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
        // Front chest area
        x: 200,
        y: 200,
        width: 400,
        height: 500,
        shape: 'rectangle'
      },
      {
        // Back area
        x: 150,
        y: 150,
        width: 500,
        height: 600,
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
        // Front print area
        x: 100,
        y: 50,
        width: 400,
        height: 300,
        shape: 'polygon',
        points: [
          [0, 0],
          [400, 30],
          [380, 280],
          [-20, 250]
        ]
      }
    ]
  }
};

export const getProductTemplate = (productType: string): ProductTemplate | undefined => {
  return productTemplates[productType];
};