import React, { useState } from 'react';
import { Product } from '@/types/Product';
import { useDrag } from 'react-dnd';

const ProductGrid = ({ products }: { products: Product[] }) => {
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    e.dataTransfer.setData('application/json', JSON.stringify(product));
    setDraggedProduct(product);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg"
          draggable
          onDragStart={(e) => handleDragStart(e, product)}
        >
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-bold">{product.price} TND</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
