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

type QueryStringEntry = [param: string, value: string | number];
/**
 * @param entries Accept any number of separate arguments, where every argument must be a QueryStringEntry pair.
 */
const setQueryString = (...entries: QueryStringEntry[]) => {
  const url = new URL(window.location.href);
  const entriesArr = [...entries];

  for (let i = 0; i < entriesArr.length; i++) {
    const param = entriesArr[i][0];
    const value = entriesArr[i][1].toString();
    if (!value) {
      url.searchParams.delete(param);
    } else {
      url.searchParams.set(param, value);
    }
  }
  window.history.replaceState({}, "", url.toString());
};

const isPositiveWholeAboveOne = (val: number) =>
  Number.isInteger(val) && val >= 1;

const ProductSearch = ({ products }: { products: Product[] }) => {
  const [count, setCount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const sortFromUrl = searchParams.get("sort") ?? "";
  const pageParam = searchParams.get("page");
  const pageFromUrl = pageParam ? Number(pageParam ?? "1") : null;

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

  const pageSize = 5;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  useEffect(() => {
    if (!pageFromUrl || !isPositiveWholeAboveOne(pageFromUrl)) {
      // Used a useEffect to initially update the querystring, however it was making changes too early to the render cycle
      setQueryString(["page", "1"]);
    } else if (pageFromUrl > totalPages) {
      setQueryString(["page", totalPages.toString()]);
    }
  }, [pageFromUrl, totalPages]);

  const currentPage =
    pageFromUrl && isPositiveWholeAboveOne(pageFromUrl) ? pageFromUrl : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  /**
   * Break the chained array functions to sort() separately
   * and use new variable "pagedProducts", this way you can get calculated properties e.g
   * total price
   * */
  const pagedProducts = filteredProducts.slice(startIndex, endIndex);

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
