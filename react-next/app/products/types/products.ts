export type FakeStore = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

export type ProductDetails = {
  category: string;
  description: string;
  name: string;
  price: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};
