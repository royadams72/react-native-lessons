import { useEffect, useState } from "react";

const useDebounce = <T>(search: T, wait: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState<T>(search);
  useEffect(() => {
    /**
     * When search updated
     * - Each search change creates a new timer.
     * - Before the new effect runs, React cleans up the previous effect and cancels its timer.
     * - Only the final timer survives long enough to update debouncedSearch.
     */
    const timeout = setTimeout(() => setDebouncedSearch(search), wait);
    return () => {
      clearTimeout(timeout);
    };
  }, [search, wait]);

  return debouncedSearch;
};
export default useDebounce;
