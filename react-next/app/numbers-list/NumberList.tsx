"use client";

import Link from "next/link";
import { useState } from "react";

type numberType = {
  numbers: number[];
};
function calculateTotal(numbers: number[]) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

function findLargest(numbers: number[]) {
  if (numbers.length === 0) {
    return "No value yet";
  }
  let largest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  return largest;
}

function findSmallest(numbers: number[]) {
  if (numbers.length === 0) {
    return "No value yet";
  }

  let smallest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < smallest) {
      smallest = numbers[i];
    }
  }
  return smallest;
}
const NumberList = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [value, setValue] = useState("");
  // These are derived state, they are called when numbers updates,
  const sum = calculateTotal(numbers);
  const smallest = findSmallest(numbers);
  const largest = findLargest(numbers);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    setNumbers([...numbers, Number(value)]);
  };
  return (
    <div>
      <p>
        <Link href={"./"}>&lt; &lt; Back</Link>
      </p>
      <h2>NumbersList component</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button type="submit">Add Number</button>
      </form>
      {numbers.length > 0 &&
        numbers.map((number, index) => <span key={index}>{number} </span>)}
      <h3>The Largest Number is {largest}</h3>
      <h3>The Smallest Number is {smallest}</h3>
      <h3>The Total amount is {sum}</h3>
    </div>
  );
};

export default NumberList;
