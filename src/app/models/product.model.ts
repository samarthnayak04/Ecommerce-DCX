export interface Product {
  id: number;
  name: string;
  model?: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  imageLocal?: string;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
