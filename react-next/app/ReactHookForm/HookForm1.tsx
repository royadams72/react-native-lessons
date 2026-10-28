"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import styles from "../page.module.css";
import { AutoCompleteValues } from "../types/autoComplete";

const UserSchema = z.object({
  age: z
    .number({ error: "Age is required" })
    .int()
    .min(18, { message: "Age must be 18 or older" }),
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
export type SmartAutoComplete = AutoCompleteValues | (string & {});

type FieldConfig = {
  type: string;
  autoComplete?: SmartAutoComplete;
  hint?: string;
  inputMode?: HTMLAttributes<string>["inputMode"];
  label: string;
  min?: number;
  name: keyof TUserSchema;
  placeholder: string;
};

const config = {
  age: {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    hint: "You must be at least 18",
    min: 18,
    inputMode: "numeric",
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@email.com",
    hint: "We'll use this to contact you",
    autoComplete: "email",
  },
  name: {
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Enter your full name",
    hint: "Please use your first and last name",
    autoComplete: "name",
  },
  password: {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a password",
    hint: "Use at least 8 characters",
    autoComplete: "new-password",
  },
} satisfies Record<keyof TUserSchema, FieldConfig>;

// Merge my custom types with kwown input types
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  dynamicText?: string;
  error?: string;
  hint?: string;
  key: string | number;
  label: string;
};
export const FormField = ({
  hint,
  label,
  dynamicText,
  error,
  key,
  ...inputProps
}: InputProps) => {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}:</span>
      <input className={styles.input} {...inputProps} />
      {hint && <div className={styles.inputHint}>{hint}</div>}
      {dynamicText && <div className={styles.inputHint}>{dynamicText}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </label>
  );
};
const HookForm = () => {
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
    resolver: zodResolver(UserSchema),
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
        {Object.keys(config).map((key) => {
          const field = key as keyof typeof config;
          const autoComplete =
            config[field].name !== "age"
              ? config[field].autoComplete
              : undefined;

          const dynamicText =
            config[field].name === "name" && displayName
              ? `Hello, ${displayName}`
              : undefined;

          const min =
            config[field].name === "age" ? config[field].min : undefined;

          return (
            <FormField
              key={field}
              type={config[field].type}
              hint={config[field].hint}
              placeholder={config[field].placeholder}
              autoComplete={autoComplete}
              label={config[field].label}
              min={min}
              dynamicText={dynamicText}
              error={errors[config[field].name]?.message}
              {...register(config[field].name, {
                ...(config[field].name === "age" && { valueAsNumber: true }),
              })}
            />
          );
        })}

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
