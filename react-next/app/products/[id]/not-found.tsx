import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="../../products">Return to products</Link>
    </div>
  );
};

export default NotFound;
