import { memo } from "react";
import styles from "../../page.module.css";
import { Product } from "../ProductMemo";
import ProductItem from "./ProductItem";

type ProductItemProps = {
  onSelect: (selectedId: number) => void;
  selectedProductId: number;
};
const ProductList = memo(function ProductList({
  products,
  onSelect,
  selectedProductId,
}: ProductItemProps & { products: Product[] }) {
  // console.count("product list rendered");

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onSelect={onSelect}
          isSelected={selectedProductId === product.id}
        />
      ))}
    </div>
  );
});

export default ProductList;
