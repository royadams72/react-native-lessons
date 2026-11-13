import styles from "../../page.module.css";
import { ProductDetails } from "../types/products";

import Button from "./Button";

const ProductDetailsComponent = ({ product }: { product: ProductDetails }) => (
  <div className={styles.people}>
    <Button task="back" small={true}>
      Back
    </Button>
    <h1
      style={{
        fontWeight: "bold",
        letterSpacing: ".1rem",
        marginBottom: "40px",
        maxWidth: "100%",
      }}
    >
      {product.name}
    </h1>
    <div className={styles.detailsContainer}>
      <div className={styles.detailsInfo}>
        <h4>Price: {product.price}</h4>
        <h4>Category: {product.category}</h4>
      </div>
      <div className={styles.detailsDescription}>
        <h3 style={{ marginBottom: "7px" }}>Description:</h3>

        {product.description}
      </div>
    </div>
  </div>
);

export default ProductDetailsComponent;
