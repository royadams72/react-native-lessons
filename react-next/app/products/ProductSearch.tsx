"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../page.module.css";
import ProductList from "./components/ProductList";
import { Product } from "./types/products";

const sorting = [
  { title: "Default", value: "" },
  { title: "Lowest first", value: "ascending" },
  { title: "Highest firs", value: "descending" },
];
type QueryStringEntries = [param: string, value: string | number];
type QType = QueryStringEntries & { func?: () => any };
// const setQueryString = (...entries: QueryStringEntries[]) => {
const setQueryString = (...entries: QueryStringEntries[]) => {
  const url = new URL(window.location.href);
  const entriesArr = [...entries];
  console.log(entriesArr);

  for (let i = 0; i < entriesArr.length; i++) {
    const param = entriesArr[i][0];
    const value = entriesArr[i][1].toString();
    if (!value) {
      url.searchParams.delete(param);
    } else {
      url.searchParams.set(param, value);
    }
    window.history.replaceState({}, "", url.toString());
  }
};
const isQueryWithinLimit = (param: string, value: string | number) => {};
const ProductSearch = ({ products }: { products: Product[] }) => {
  // console.count("Parent rendered");
  const [count, setCount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const sortFromUrl = searchParams.get("sort") ?? "";
  const pageParam = searchParams.get("page");
  const pageFromUrl = pageParam ?? "1";

  // Without useCallback, useMemo and memo the Product, ProductList and productItem re-render when an unrelated Product state is updated
  // With it just the Product (parent) updates
  const onSelect = useCallback((selectedId: number) => {
    setSelectedProductId(selectedId);
  }, []);

  const normalizedSearch = searchFromUrl.trim().toLowerCase();

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => {
          return product.name.toLowerCase().trim().includes(normalizedSearch);
        })
        .sort((a, b) => {
          if (sortFromUrl === "ascending") {
            return a.price - b.price;
          }
          if (sortFromUrl === "descending") {
            return b.price - a.price;
          }
          return 0;
        }),
    [products, normalizedSearch, sortFromUrl],
  );
  /**
   * Break the chained array functions to sort()
   * and put into new variable, this way you can get calculated properties e.g
   * total price
   * */
  const pageSize = 5;
  const totalPages = Math.round(Math.ceil(filteredProducts.length / pageSize));
  // let currentPage = Math.round(Number(pageFromUrl));

  useEffect(() => {
    console.log("useEffect::", pageParam, "totalPages", totalPages);

    if (pageParam === null) {
      // Use a useEffect, as this was making changes too early
      setQueryString(["page", "1"]);
    } else if (
      !(Number(pageParam) > totalPages) ||
      !(Number(pageParam) < totalPages)
    ) {
      setCurrentPage(Math.round(Number(pageFromUrl)));
      // currentPage = Math.round(Number(pageFromUrl));
    }
  }, [pageParam]);
  console.log("currentPage::", currentPage, "totalPages::", totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pagedProducts = filteredProducts.slice(startIndex, endIndex);

  // console.log("startIndex::", startIndex, "endIndex::", endIndex);
  // console.log(pagedProducts);

  let totalPrice = 0;
  for (let i = 0; i < pagedProducts.length; i++) {
    totalPrice += Math.round(pagedProducts[i].price);
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
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
            value={searchFromUrl}
            autoComplete="off"
            onChange={(e) =>
              setQueryString(["search", e.target.value], ["page", "1"])
            }
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
                checked={sortFromUrl === option.value}
                onChange={() =>
                  setQueryString(["sort", option.value], ["page", "1"])
                }
              />
              <span className={styles.radioLabel}>{option.title}</span>
            </label>
          ))}
        </fieldset>
        <ProductList
          products={pagedProducts}
          onSelect={onSelect}
          selectedProductId={selectedProductId}
        />
        <div className={styles.people}>£{totalPrice}</div>
        <nav aria-label="pagination" className={styles.pagination}>
          <div className={styles.paginationPrev}>
            <button
              type="button"
              onClick={() =>
                currentPage > 1 && setQueryString(["page", currentPage - 1])
              }
            >
              &lt; Prev
            </button>
          </div>
          <div className={styles.paginationDisplay}>
            Page {currentPage} of {totalPages}
          </div>
          <div className={styles.paginationNext}>
            {" "}
            <button
              type="button"
              onClick={() =>
                currentPage < totalPages &&
                setQueryString(["page", currentPage + 1])
              }
            >
              Next &gt;
            </button>
          </div>
        </nav>
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

export default ProductSearch;
