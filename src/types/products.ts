export interface Product {
  image: string;
  stock: number;
  images: string[];
  _id: string;
  name: string;
  imageUrl: string;
  colors: string[];
  price: number;
  description: string;
  category: string;
  discountPercent: number;
  isNew: boolean;
  sizes: string[];
  selectedColor?: string;
  selectedSize?: string;
  quantity?: number | null;
  selectedQuantity?: number;
}