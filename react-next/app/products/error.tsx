"use client";

import styles from "../page.module.css";
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <h2>There was an error loading products</h2>

      <p>{error.message}</p>
      <button className={styles.button} type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default Error;
