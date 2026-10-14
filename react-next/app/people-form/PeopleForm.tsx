"use client";
import { useState } from "react";
import styles from "../page.module.css";
type Person = {
  id: number;
  age: number;
  name: string;
};

const peopleArr = [
  {
    id: 1,
    age: 53,
    name: "Roy",
  },
  {
    id: 2,
    age: 40,
    name: "Sarah",
  },
  {
    id: 3,
    age: 61,
    name: "David",
  },
];

const findOldestPerson = (people: Person[]) => {
  if (!people.length) {
    return "No data";
  }
  let oldestPerson = people[0];

  for (let i = 0; i < people.length; i++) {
    if (people[i].age > oldestPerson.age) {
      oldestPerson = people[i];
    }
  }
  return oldestPerson.name;
};

const calculateAverageAge = (people: Person[]) => {
  if (!people.length) {
    return null;
  }
  let total = 0;
  for (let i = 0; i < people.length; i++) {
    total += people[i].age;
  }
  return Math.round(total / people.length);
};

const newId = (people: Person[]) => {
  let highestId = 0;
  for (let i = 0; i < people.length; i++) {
    if (people[i].id > highestId) {
      highestId = people[i].id;
    }
  }
  return highestId + 1;
};
const normalise = (str: string): string => {
  return str.toLowerCase().trim();
};

const PeopleForm = () => {
  const [people, setPeople] = useState<Array<Person>>(peopleArr);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");
  const normalisedSearch = normalise(search);

  const filteredPeople = people.filter((person) => {
    // Convert non-string fields to strings when using string search methods like includes.
    const dynamicSearch =
      String(person.age).includes(normalisedSearch) ||
      normalise(person.name).includes(normalisedSearch);
    return dynamicSearch;
  });

  const oldestPerson = findOldestPerson(people);
  const average = calculateAverageAge(people);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!age || Number(age) < 1 || !name) {
      return;
    }
    const id = newId(people);
    const newPerson = { id, age: Number(age), name };

    setPeople([...people, newPerson]);
    setName("");
    setAge("");
  };

  return (
    <>
      <h2>Add Person Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* When input is nested inside <label> label for=... is not needed */}
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            type="text"
            className={styles.input}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Age</span>
          <input
            type="number"
            className={styles.input}
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </label>
        <div className={styles.field}>
          <button className={styles.button}>Add Person</button>
        </div>
        <label className={`${styles.field} ${styles.twentyPixTop}`}>
          <span className={styles.label}>Search</span>
          <input
            type="text"
            className={styles.input}
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </label>
      </form>
      <div>
        <h2>People</h2>
        <div className={styles.people}>
          {filteredPeople.map((person) => (
            <div className={styles.person} key={person.id}>
              {`${person.name} - ${person.age}`}
            </div>
          ))}
          <div className={styles.people}>
            <h2>Oldest Person</h2>
            <div className={styles.person}> {oldestPerson}</div>
          </div>
          <div className={styles.people}>
            <h2>Average Age</h2>
            <div className={styles.person}>
              {average === null ? "No data" : average}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PeopleForm;
