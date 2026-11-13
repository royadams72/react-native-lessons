import { Product } from "../ProductMemo";
import { FakeStore, ProductDetails } from "../types/products";

export function mapData(data: FakeStore): Product {
  return {
    id: data.id,
    name: data.title,
    price: data.price,
  };
}

export function mapProducts(data: FakeStore[]): Product[] {
  return data.map((item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
  }));
}

export function mapDetails(data: FakeStore): ProductDetails {
  return {
    category: data.category,
    description: data.description,
    name: data.title,
    price: data.price,
  };
}
