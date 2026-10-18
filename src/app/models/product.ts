export interface Product {
  id: number;
  name: string;
  category: 'electronics' | 'office' | 'furniture';
  price: number;
  stock: number;
  rating: number;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Mouse', category: 'electronics', price: 24.99, stock: 32, rating: 4 },
  { id: 2, name: 'Mechanical Keyboard', category: 'electronics', price: 89, stock: 4, rating: 5 },
  { id: 3, name: 'Standing Desk', category: 'furniture', price: 399, stock: 0, rating: 4 },
  { id: 4, name: 'Notebook A5', category: 'office', price: 3.5, stock: 120, rating: 3 },
  { id: 5, name: '27" Monitor', category: 'electronics', price: 249, stock: 12, rating: 4 },
  { id: 6, name: 'Ergonomic Chair', category: 'furniture', price: 289, stock: 3, rating: 5 },
  { id: 7, name: 'USB-C Hub', category: 'electronics', price: 39.95, stock: 18, rating: 3 },
  { id: 8, name: 'Desk Organizer', category: 'office', price: 14.5, stock: 2, rating: 4 },
  { id: 9, name: 'Headphones', category: 'electronics', price: 199, stock: 7, rating: 5 },
  { id: 10, name: 'Whiteboard', category: 'office', price: 59, stock: 9, rating: 2 },
];
