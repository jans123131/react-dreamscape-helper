import React from 'react';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductSelect, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    if (onDragStart) {
      onDragStart(e, product);
    } else {
      e.dataTransfer.setData('application/json', JSON.stringify(product));
    }
  };

  const handleClick = (product: Product) => {
    onProductSelect(product);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          draggable
          onDragStart={(e) => handleDragStart(e, product)}
          onClick={() => handleClick(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price} TND</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;