export type PersonalizationConfig = {
  [key: string]: {
    canPersonalize: boolean;
    message?: string;
    maxLength?: number;
  };
};

export const personalizationConfig: PersonalizationConfig = {
  // Prêt à Porter - Homme
  'costumes': { canPersonalize: true, maxLength: 100 },
  'blazers': { canPersonalize: true, maxLength: 100 },
  'chemises': { canPersonalize: true, maxLength: 4 },
  'pantalons': { canPersonalize: true, maxLength: 100 },
  'pollo': { canPersonalize: true, maxLength: 100 },
  
  // Prêt à Porter - Femme
  'robes': { canPersonalize: true, maxLength: 100 },
  'vestes': { canPersonalize: true, maxLength: 100 },
  
  // Accessoires - Homme
  'portefeuilles': { canPersonalize: true, maxLength: 100 },
  'ceintures': { canPersonalize: true, maxLength: 100 },
  'cravates': {
    canPersonalize: false,
    message: 'Les cravates ne peuvent pas être personnalisées'
  },
  'mallettes': { canPersonalize: true, maxLength: 100 },
  'porte-cartes': { canPersonalize: true, maxLength: 100 },
  'porte-cles': { canPersonalize: true, maxLength: 100 },
  
  // Accessoires - Femme
  'sacs-a-main': { canPersonalize: true, maxLength: 100 },
  
  // Default case for any unspecified item group
  'default': { canPersonalize: true, maxLength: 100 }
};

export const canItemBePersonalized = (itemGroup: string): boolean => {
  if (!itemGroup) return false;
  console.log('Checking personalization for itemGroup:', itemGroup);
  const config = personalizationConfig[itemGroup.toLowerCase()] || personalizationConfig.default;
  console.log('Personalization config for', itemGroup, ':', config);
  return config.canPersonalize;
};

export const getPersonalizationMessage = (itemGroup: string): string | undefined => {
  if (!itemGroup) return undefined;
  console.log('Getting message for itemGroup:', itemGroup);
  const config = personalizationConfig[itemGroup.toLowerCase()] || personalizationConfig.default;
  console.log('Message config for', itemGroup, ':', config.message);
  return config.message;
};

export const getMaxLength = (itemGroup: string): number => {
  if (!itemGroup) return 100;
  const normalizedItemGroup = itemGroup.toLowerCase();
  const config = personalizationConfig[normalizedItemGroup] || personalizationConfig.default;
  console.log('Getting max length for itemGroup:', itemGroup, 'Max length:', config.maxLength);
  return normalizedItemGroup === 'chemises' ? 4 : (config.maxLength || 100);
};