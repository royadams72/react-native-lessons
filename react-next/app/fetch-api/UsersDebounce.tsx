"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import styles from "../page.module.css";

type User = {
  id: number;
  email: string;
  name: string;
};

const findLongestName = (users: User[]) => {
  if (users.length === 0) {
    return;
  }
  let longestNameUser = users[0];
  for (let i = 1; i < users.length; i++) {
    if (users[i].name.length > longestNameUser.name.length) {
      longestNameUser = users[i];
    }
  }
  return longestNameUser;
};
const normalise = (str: string) => {
  return str.toLowerCase().trim();
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  // Search logic
  const debouncedSearch = useDebounce(search, 300);
  const normalisedSearch = normalise(debouncedSearch);
  const filteredSearch = users.filter((user) =>
    normalise(user.name).includes(normalisedSearch),
  );

  const userWithLongestName = findLongestName(filteredSearch);

  useEffect(() => {
    setLoading(true);
    console.log(search);

    async function fetchApi() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error(`status ${res.status}`);
        }
        const users: User[] = await res.json();

        setUsers(users);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setError(`Could not load users: ${message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchApi();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <form className={styles.form}>
        <h2>Search Users</h2>
        <input
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
      <div className={styles.people}>
        {filteredSearch.map((user) => (
          <div key={user.id} className={styles.person}>
            {user.name}
          </div>
        ))}
      </div>
      <div className={styles.people}>
        <h2>User with the longest name</h2>
        <div>{userWithLongestName?.name}</div>
      </div>
    </>
  );
};

export default Users;
