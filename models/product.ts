export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
}

export type Category = {
  id: number;
  name: string;
  description: string;
}

export type CartItem = Omit<Product, 'id'> & {
  productId: number;
  quantity: number;
}
