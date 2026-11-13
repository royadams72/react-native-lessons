import { notFound } from "next/navigation";
import ProductDetailsComponent from "../components/ProductDetails";
import { fetchApi } from "../lib/api";
import { mapDetails } from "../lib/products";
import { FakeStore, ProductDetails } from "../types/products";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const idNum = Number(id);
  const isPositiveInteger = Number.isInteger(idNum) && idNum > 0;

  if (!isPositiveInteger) {
    notFound();
  }

  const product = await fetchApi<FakeStore, ProductDetails>(
    `https://fakestoreapi.com/products/${id}`,
    mapDetails,
  );

  if (!product) {
    notFound();
  }
  return <ProductDetailsComponent product={product} />;
};

export default ProductPage;
