export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
