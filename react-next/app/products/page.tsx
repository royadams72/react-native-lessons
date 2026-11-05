import { Product } from "./ProductMemo";
import ProductMemoServer from "./ProductMemoServer";

type FakeStore = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};
function mapData(data: FakeStore[]): Product[] {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    result.push({
      id: data[i].id,
      name: data[i].title,
      price: data[i].price,
    });
  }
  return result;
}
async function fetchApi() {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
  });

  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const data = await res.json();
  const mappedProducts = mapData(data);
  return mappedProducts;
}

const page = async () => {
  const products = await fetchApi();

  return <ProductMemoServer products={products} />;
};

export default page;
