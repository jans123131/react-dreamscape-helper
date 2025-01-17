export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  personalization?: string;
  withBox?: boolean;
}