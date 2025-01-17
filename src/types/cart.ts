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
  color?: string;
  withBox?: boolean;
  fromPack?: boolean;
  discount_product?: string;
  pack?: string;
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