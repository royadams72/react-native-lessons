"use client";

import { useCallback, useMemo, useState } from "react";
import styles from "../page.module.css";
import ProductList from "./components/ProductList";

type Product = {
  id: number;
  name: string;
  price: number;
};

const sorting = [
  { title: "Default", value: "" },
  { title: "Lowest first", value: "ascending" },
  { title: "Highest firs", value: "descending" },
];

const ProductMemoServer = ({ products }: { products: Product[] }) => {
  // console.count("Parent rendered");
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
    [products, normalizedSearch, sort],
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

export default ProductMemoServer;
