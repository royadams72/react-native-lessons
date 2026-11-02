import { Suspense } from "react";
import UseFieldArrComponent from "./UseFieldArr";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading form…</div>}>
      {" "}
      <UseFieldArrComponent />
    </Suspense>
  );
};

export default Page;
