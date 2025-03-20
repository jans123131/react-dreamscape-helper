
import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';
import { Product } from '../../types';
import { getBadgeImage, shouldShowBadge } from '../../utils/productBadgeUtils';

interface ProductBadgeProps {
  product: Product;
  productId: number;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ product, productId }) => {
  // Don't render anything if the product shouldn't show a badge
  if (!shouldShowBadge(product)) {
    return null;
  }

  // Check if this is one of the specific fig products that need higher positioning
  const isSpecialFig = 
    product.title === 'Figues djebaa 200g' || 
    product.title === 'Figues ZIDI 200g' || 
    product.title === 'Figues Toujane 200g';

  // Animation variants for the badge - positioned for better responsiveness
  // with special positioning for the specified fig products
  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      rotate: -15,
      scale: 0.5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15,
        duration: 1.2,
        delay: productId * 0.15 + 0.5
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 200,
        duration: 0.8
      }
    }
  };

  const badgeImage = getBadgeImage(product);
  if (!badgeImage) {
    return null;
  }

  // Position the badge higher for special fig products by reducing the top percentage
  return (
    <motion.div
      className={`absolute ${isSpecialFig ? 'top-[50%]' : 'top-[81%]'} right-[20%] z-10 w-[110px] sm:w-[130px] md:w-[150px] transform translate-x-[20%] sm:translate-x-[15%] md:translate-x-[10%]`}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={badgeVariants}
    >
      <div className="w-full h-auto">
        <OptimizedImage 
          src={badgeImage} 
          alt="Product Type" 
          className="w-[220px] h-full object-contain"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default ProductBadge;
