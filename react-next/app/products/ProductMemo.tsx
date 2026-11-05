"use client";

import { memo, useCallback, useMemo, useState } from "react";
import styles from "../page.module.css";

export type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 350 },
  { id: 5, name: "Headphones", price: 150 },
];
const sorting = [
  { title: "Default", value: "" },
  { title: "Lowest first", value: "ascending" },
  { title: "Highest firs", value: "descending" },
];

type ProductItemProps = {
  onSelect: (selectedId: number) => void;
  selectedProductId: number;
};

const ProductItem = memo(function ProductItem({
  product,
  onSelect,
  isSelected,
}: {
  isSelected: boolean;
  onSelect: (selectedId: number) => void;
  product: Product;
}) {
  console.count(`product item rendered ${product.name}`);

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

const ProductList = memo(function ProductList({
  products,
  onSelect,
  selectedProductId,
}: ProductItemProps & { products: Product[] }) {
  console.count("product list rendered");

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

const Product = () => {
  console.count("Parent rendered");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [count, setCount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(0);
  // Without useCallback, useMemo and memo the Product, ProductList and productItem re-render when an unrelated Product state is updated
  // With it just the Product (parent) updates
  const onSelect = useCallback((selectedId: number) => {
    setSelectedProductId(selectedId);
  }, []);

  // const onSelect = (selectedId: number) => {
  //   setSelectedProductId(selectedId);
  //   // console.log(selectedProductId);
  // };
  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => {
          console.log("recalc");

          return product.name.toLowerCase().trim().includes(normalizedSearch);
        })
        .sort((a, b) => {
          if (sort === "ascending") {
            return a.price - b.price;
          }
          if (sort === "descending") {
            return b.price - a.price;
          }
          return 0;
        }),
    [normalizedSearch, sort],
  );

  let totalPrice = 0;
  for (let i = 0; i < filteredProducts.length; i++) {
    totalPrice += filteredProducts[i].price;
  }
  return (
    <>
      <div>Product Search</div>
      <form className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Search products</span>
          <input
            className={styles.input}
            placeholder="Search by name..."
            value={search}
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <fieldset className={styles.fieldset}>
          <legend className={styles.inputHint}>Sort by price</legend>
          {sorting.map((option) => (
            <label className={styles.radioField} key={option.value}>
              <input
                type="radio"
                name="sorting"
                className={styles.radio}
                value={option.value}
                checked={sort === option.value}
                onChange={() => setSort(option.value)}
              />
              <span className={styles.radioLabel}>{option.title}</span>
            </label>
          ))}
        </fieldset>
        <ProductList
          products={filteredProducts}
          onSelect={onSelect}
          selectedProductId={selectedProductId}
        />
        <div className={styles.people}>£{totalPrice}</div>

        {/* This button sets state in the parent, however, the child component is re-rendered also */}
        <button
          type="button"
          className={styles.button}
          onClick={() => setCount((prev) => prev + 1)}
        >{`Count: ${count}, press to increment`}</button>
      </form>
    </>
  );
};

export default Product;
