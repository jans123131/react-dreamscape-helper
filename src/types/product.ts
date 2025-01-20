export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  stock: number; // Added stock property
  discount_product?: string;
  type_product?: string;
  itemgroup_product?: string;
}