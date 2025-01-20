import React from 'react';
import { Product } from '@/types/product';

const ProductDetailContainer = ({ product }: { product: Product }) => {
  const checkStock = () => {
    const stockLevel = product.stock || 0;
    return stockLevel > 0;
  };

  return (
    <div className="product-detail-container">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-semibold">{product.price} TND</p>
      <p className="text-sm">Stock: {checkStock() ? 'Available' : 'Out of stock'}</p>
      <img src={product.image} alt={product.name} className="w-full h-auto" />
    </div>
  );
};

export default ProductDetailContainer;
