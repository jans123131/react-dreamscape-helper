export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  personalization?: string;
  fromPack?: boolean;
  pack?: string;
  withBox?: boolean;
  discount_product?: string;
  type_product?: string;
  itemgroup_product: string; // Made required
}