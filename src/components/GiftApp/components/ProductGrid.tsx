import React from 'react';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onProductSelect?: (product: Product) => void;
}

const ProductGrid = ({ products, onDragStart, onProductSelect }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div
          key={product.id}
          draggable
          onDragStart={(event) => onDragStart(event, product)}
          onClick={() => onProductSelect && onProductSelect(product)}
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105"
        >
          <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price} TND</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
