"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import * as z from "zod";
import styles from "../page.module.css";

const UserSchema = z.object({
  age: z.number().int().min(18, { message: "Age must be 18 or older" }),
  email: z.email({ message: "Make sure your email address is correct" }),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});
type TUserSchema = z.infer<typeof UserSchema>;

const config = {
  age: {
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    hint: "You must be at least 18",
    min: 18,
    inputMode: "numeric",
  },
  email: {
    label: "Email address",
    type: "email",
    placeholder: "example@email.com",
    hint: "We'll use this to contact you",
    autoComplete: "email",
  },
  name: {
    label: "Full name",
    type: "text",
    placeholder: "Enter your full name",
    hint: "Please use your first and last name",
    autoComplete: "name",
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    hint: "Use at least 8 characters",
    autoComplete: "new-password",
  },
} as const;

const HookForm = () => {
  const configName = config.name;
  const configAge = config.age;
  const configEmail = config.email;
  const configPassword = config.password;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUserSchema>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(UserSchema) as Resolver<TUserSchema>,
  });

  const displayName = watch("name");
  const onSubmit = async (data: TUserSchema) => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });

    console.log("Submitted:", {
      age: data.age,
      email: data.email,
      name: data.name,
    });
  };
  return (
    <>
      <h2>HookForm</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <span className={styles.label}>{configName.label}:</span>
          <input
            className={styles.input}
            type={configName.type}
            placeholder={configName.placeholder}
            autoComplete={configName.autoComplete}
            {...register("name")}
          />
          {configName.hint && (
            <div className={styles.inputHint}>{configName.hint}</div>
          )}
          {displayName && (
            <div className={styles.inputHint}>Hello, {displayName}</div>
          )}
          {errors.name?.message && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Age:</span>
          <input className={styles.input} type="number" {...register("age")} />
          {errors.age?.message && (
            <div className={styles.error}>{errors.age.message}</div>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email:</span>
          <input className={styles.input} type="text" {...register("email")} />
          {errors.email?.message && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Password:</span>

          <input
            className={styles.input}
            type="password"
            {...register("password")}
          />
          {errors.password?.message && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </label>
        <div className={styles.formFooter}>
          <button
            type="button"
            onClick={() => reset()}
            className={styles.button}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            Add Person
          </button>
        </div>
      </form>
    </>
  );
};

export default HookForm;
