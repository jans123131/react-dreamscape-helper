import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  personalization?: string;
  type_product?: string;
  itemgroup_product?: string;
  originalPrice?: number;
  boxTotal?: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  hasNewsletterDiscount: boolean;
  applyNewsletterDiscount: () => void;
  removeNewsletterDiscount: () => void;
  getTotals: () => { subtotal: number; discount: number; total: number; boxTotal?: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasNewsletterDiscount, setHasNewsletterDiscount] = useState(false);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyNewsletterDiscount = () => {
    setHasNewsletterDiscount(true);
  };

  const removeNewsletterDiscount = () => {
    setHasNewsletterDiscount(false);
  };

  const getTotals = () => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const boxTotal = items.reduce((acc, item) => acc + (item.boxTotal || 0), 0);
    const discount = hasNewsletterDiscount ? subtotal * 0.05 : 0;
    const total = subtotal - discount + (boxTotal || 0);
    
    return { subtotal, discount, total, boxTotal };
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    hasNewsletterDiscount,
    applyNewsletterDiscount,
    removeNewsletterDiscount,
    getTotals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
