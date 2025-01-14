export const getPackPrice = (packType: string): number => {
  switch (packType) {
    case 'Pack Prestige':
      return 50;
    case 'Pack Premium':
      return 30;
    case 'Pack Trio':
      return 20;
    case 'Pack Duo':
      return 20;
    case 'Pack Mini Duo':
      return 0;
    case 'Pack Chemise':
      return 10;
    case 'Pack Ceinture':
      return 10;
    case 'Pack Cravatte':
      return 10;
    case 'Pack Malette':
      return 10;
    default:
      return 0;
  }
};