
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '../../types';
import { useTranslation } from 'react-i18next';

interface ProductsGridProps {
  products: Product[];
  onSelectProduct: (id: string) => void;
  subcategory?: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, onSelectProduct, subcategory }) => {
  const { t } = useTranslation();
  
  // Filter products by subcategory if provided
  const filteredProducts = subcategory 
    ? products.filter(product => product.subcategory === subcategory)
    : products;
  
  return (
    <div className="py-8">
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-500 text-lg">{t('products.no_products_found')}</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 } 
              }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <ProductCard product={product} onSelect={onSelectProduct} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductsGrid;
