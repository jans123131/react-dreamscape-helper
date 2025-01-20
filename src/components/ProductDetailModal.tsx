import React from 'react';
import { useCart } from './cart/CartProvider';
import { CartItem } from '@/types/cart';

interface ProductDetailModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    itemgroup_product?: string;
  };
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: '-',
      color: '-',
      personalization: '-',
      withBox: false,
      itemgroup_product: product.itemgroup_product || 'default' // Added required field
    };
    
    addToCart(cartItem);
    onClose();
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>Price: {product.price} TND</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductDetailModal;
