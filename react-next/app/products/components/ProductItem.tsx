import { memo } from "react";
import styles from "../../page.module.css";
import { Product } from "../ProductMemo";

const ProductItem = memo(function ProductItem({
  product,
  onSelect,
  isSelected,
}: {
  isSelected: boolean;
  onSelect: (selectedId: number) => void;
  product: Product;
}) {
  // console.count(`product item rendered ${product.name}`);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productPrice}>£{product.price}</div>
      <div className={styles.productButton}>
        <button
          type="button"
          onClick={() => onSelect(product.id)}
          className={`${styles.buttonSmall} ${isSelected ? styles.buttonSelected : ""}`}
        >
          Select
        </button>
      </div>
    </div>
  );
});

export default ProductItem;
