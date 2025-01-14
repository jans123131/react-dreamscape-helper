import { Product } from '@/types/product';
import { toast } from "@/hooks/use-toast";

export const validatePackSelection = (selectedItems: Product[], containerCount: number, packType: string) => {
  if (selectedItems.length !== containerCount) {
    toast({
      title: "Sélection incomplète",
      description: `Veuillez sélectionner ${containerCount} articles pour ce pack`,
      variant: "destructive",
    });
    return false;
  }

  switch (packType) {
    case 'Pack Chemise': {
      const chemises = selectedItems.filter(item => item.itemgroup_product === 'chemises');
      if (chemises.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Chemise doit contenir exactement 1 chemise",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Ceinture': {
      const ceintures = selectedItems.filter(item => item.itemgroup_product === 'ceintures');
      if (ceintures.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Ceinture doit contenir exactement 1 ceinture",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Cravatte': {
      const cravates = selectedItems.filter(item => item.itemgroup_product === 'cravates');
      if (cravates.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Cravatte doit contenir exactement 1 cravate",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Malette': {
      const malettes = selectedItems.filter(item => item.itemgroup_product === 'mallettes');
      if (malettes.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Malette doit contenir exactement 1 malette",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Prestige': {
      const chemises = selectedItems.filter(item => item.itemgroup_product === 'chemises');
      const accessoiresCount = selectedItems.filter(item => item.type_product === 'Accessoires').length;
      
      if (chemises.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Prestige doit contenir exactement 1 chemise",
          variant: "destructive",
        });
        return false;
      }
      
      if (accessoiresCount !== 2) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Prestige doit contenir 2 accessoires",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Premium': {
      const cravates = selectedItems.filter(item => item.itemgroup_product === 'Cravates');
      const accessoiresCount = selectedItems.filter(item => item.type_product === 'Accessoires').length;
      
      if (cravates.length !== 1) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Premium doit contenir exactement 1 cravate",
          variant: "destructive",
        });
        return false;
      }
      
      if (accessoiresCount !== 2) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Premium doit contenir 2 accessoires",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Trio': {
      const hasPortefeuille = selectedItems.some(item => item.itemgroup_product === 'Portefeuilles');
      const hasCeinture = selectedItems.some(item => item.itemgroup_product === 'Ceintures');
      const hasAccessoire = selectedItems.some(item => item.type_product === 'Accessoires');
      if (!hasPortefeuille || !hasCeinture || !hasAccessoire) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Trio doit contenir 1 portefeuille, 1 ceinture et 1 accessoire",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Duo': {
      const duoHasPortefeuille = selectedItems.some(item => item.itemgroup_product === 'Portefeuilles');
      const duoHasCeinture = selectedItems.some(item => item.itemgroup_product === 'Ceintures');
      if (!duoHasPortefeuille || !duoHasCeinture) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Duo doit contenir 1 portefeuille et 1 ceinture",
          variant: "destructive",
        });
        return false;
      }
      break;
    }

    case 'Pack Mini Duo': {
      const hasPorteCartes = selectedItems.some(item => item.itemgroup_product === 'Porte-cartes');
      const hasPorteCles = selectedItems.some(item => item.itemgroup_product === 'Porte-clés');
      if (!hasPorteCartes || !hasPorteCles) {
        toast({
          title: "Sélection invalide",
          description: "Le Pack Mini Duo doit contenir 1 porte-cartes et 1 porte-clés",
          variant: "destructive",
        });
        return false;
      }
      break;
    }
  }

  return true;
};
