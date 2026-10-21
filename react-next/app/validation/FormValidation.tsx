"use client";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "../page.module.css";

type User = {
  age: string;
  email: string;
  name: string;
  password: string;
};

type SubmittedUser = Omit<User, "password">;

type Error = {
  age?: string | null;
  email?: string | null;
  name?: string | null;
  password?: string | null;
};

const initialUser = {
  age: "",
  email: "",
  name: "",
  password: "",
};

const normalise = (str: string): string => {
  return str.toLowerCase().trim();
};

const validateAge = (age: string): string => {
  if (!age || !Number.isFinite(Number(age)) || Number(age) < 18) {
    return "Age must be 18 or older";
  }

  return "";
};

const validateEmail = (email: string): string => {
  if (!email || !normalise(email).includes("@")) {
    return "Email must contain @";
  }

  return "";
};

const validateName = (name: string): string => {
  if (!name || normalise(name).length < 2) {
    return "Name must be at least 2 characters";
  }

  return "";
};

const validatePassword = (password: string): string => {
  if (!password || normalise(password).length < 8) {
    return "password must be at least 8 characters";
  }

  return "";
};

const handleChange = <T, K extends keyof T>(
  stateSetter: Dispatch<SetStateAction<T>>,
  inputField: K,
  value: T[K], // You must explicitly force the input value to match whatever type T[K] happens to be.
) => {
  stateSetter((prev) => {
    return { ...prev, [inputField]: value };
  });
};

const FormValidation = () => {
  const [user, setUser] = useState<User>(initialUser);
  const [error, setError] = useState<Error>(initialUser);
  const [submittedUser, setSubmittedUser] = useState<SubmittedUser | null>(
    null,
  );

  const validFieldTarget = 4;

  const countValid = () => {
    let validCount = 0;
    if (!validateAge(user.age)) validCount++;

    if (!validateEmail(user.email)) validCount++;

    if (!validateName(user.name)) validCount++;

    if (!validatePassword(user.password)) validCount++;

    return validCount;
  };
  const validFields = countValid();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = {
      age: validateAge(user.age),
      email: validateEmail(user.email),
      name: validateName(user.name),
      password: validatePassword(user.password),
    };
    setError(error);

    if (validFields === validFieldTarget) {
      setSubmittedUser(user);
    }
  };

  return (
    <>
      <h2>FormValidation</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* All we want are the keys to set up the form fields
        The values will be set by state */}
        {Object.keys(user).map((field) => {
          const fieldName = field as keyof User;
          return (
            <label className={styles.field} key={field}>
              <span className={styles.label}>{field}</span>
              <input
                className={styles.input}
                type={
                  field === "age"
                    ? "number"
                    : field === "password"
                      ? "password"
                      : "text"
                }
                name={field}
                value={user[fieldName]}
                onChange={(e) =>
                  handleChange(setUser, fieldName, e.target.value)
                }
              ></input>
              {error[fieldName] && (
                <div className={styles.errorContainer}>
                  <div className={styles.error}>{error[fieldName]}</div>
                </div>
              )}
            </label>
          );
        })}
        <button type="submit" className={styles.button}>
          Add Person
        </button>
      </form>
      {
        <div className={styles.person}>
          Valid fields: {validFields} / {validFieldTarget}
        </div>
      }
      {submittedUser && (
        <div className={styles.people}>
          <div className={styles.person}>
            Name: {submittedUser?.name} - Age: {submittedUser?.age} - Email:{" "}
            {submittedUser?.email}
          </div>
        </div>
      )}
    </>
  );
};

export default FormValidation;
