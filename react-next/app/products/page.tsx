import { fetchApi } from "./lib/api";
import { mapProducts } from "./lib/products";
import { Product } from "./ProductMemo";
import ProductSearch from "./ProductSearch";
import { FakeStore } from "./types/products";

const page = async () => {
  const result = await fetchApi<FakeStore[], Product[]>(
    "https://fakestoreapi.com/products",
    mapProducts,
  );
  // Because this endpoint and mapProducts already return Product[], use below
  const products = result ?? [];
  return <ProductSearch products={products} />;
};

export default page;
