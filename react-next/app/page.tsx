import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>React Next.js Lessons</h1>
          <p>
            <Link href={"./numbers-list/"}>Numbers List</Link>
          </p>
          <p>
            <Link href={"./people-form/"}>People Form</Link>
          </p>
          <p>
            <Link href={"./fetch-api/"}>Fetch Users</Link>
          </p>
          <p>
            <Link href={"./validation"}>Form Validation</Link>
          </p>
          <p>
            <Link href={"./ReactHookForm"}>Hook Form</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
