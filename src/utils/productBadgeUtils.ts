
import { Product } from '../types';

/**
 * Determines which badge image to show based on the product category and ID
 */
export const getBadgeImage = (product: Product): string => {
  // Handle figues-sechees subcategories
  if (product.category === 'figues-sechees-djebaa' as any) {
    return "/produits/figuesechesicon.png";
  } else if (product.category === 'figues-sechees-zidi' as any) {
    return "/produits/toujanevracicon.png";
  } else if (product.category === 'figues-sechees-toujane' as any) {
    return "/produits/figuesechesicon.png";
  } else if (product.category === 'figues-sechees' as any) {
    // Special case for specific fig products by title
    if (product.title === 'Figues Toujane 200g') {
      return "/produits/figuesechesicon.png";
    }
    
    if (product.title === 'Figues ZIDI 200g') {
      return "/produits/toujanevracicon.png";
    }
    
    if (product.title === 'Figues djebaa 200g') {
      return "/produits/figuesechesicon.png";
    }
    
    // Default case for other figue products
    return "/produits/figuesechesicon.png";
  } else if (product.category === 'sucre-dattes' as any) {
    return "/produits/sucredatteicon.png";
  } else if (product.category === 'cafe-dattes' as any) {
    return "/produits/caffeicon.png";
  } else if (product.category === 'sirop-dattes' as any) { 
    return "/produits/dattesicon.png";   
  }
  
  return "";
};

/**
 * Determines if a product should show a badge
 */
export const shouldShowBadge = (product: Product): boolean => {
  // Handle figues-sechees subcategories (all except vrac should show badges)
  if (
    product.category === 'figues-sechees-djebaa' as any ||
    product.category === 'figues-sechees-zidi' as any ||
    product.category === 'figues-sechees-toujane' as any
  ) {
    return true;
  }
  
  // No badge for vrac category
  if (product.category === 'figues-sechees-vrac' as any) {
    return false;
  }
  
  // Check for specific figue products by title
  if (product.title === 'Figues djebaa 200g' ||
      product.title === 'Figues ZIDI 200g' ||
      product.title === 'Figues Toujane 200g') {
    return true;
  }
  
  // Specific checks for figue products by ID and title
  if (product.category === 'figues-sechees' as any) {
    // No badge for Figues Séchées en Vrac
    if (product.id === '10' && product.title === 'Figues Séchées en Vrac') {
      return false;
    }
    
    return false;
  }
  
  // Regular check for other categories
  return ['sucre-dattes', 'cafe-dattes', 'sirop-dattes'].includes(product.category as any);
};
