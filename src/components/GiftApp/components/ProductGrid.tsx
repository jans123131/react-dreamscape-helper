import React from 'react';
import { Product } from '@/types/Product';

interface ProductGridProps {
  products: Product[];
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onDragStart, onProductSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg cursor-pointer"
          draggable={!!onDragStart}
          onDragStart={(e) => onDragStart?.(e, product)}
          onClick={() => onProductSelect(product)}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover mb-2" 
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 line-clamp-2">{product.description}</p>
          <p className="text-xl font-bold mt-2">{product.price} TND</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;