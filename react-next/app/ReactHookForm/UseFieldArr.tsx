"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { memo, useState } from "react";
import { useFieldArray, useForm, Watch } from "react-hook-form";
import * as z from "zod";
import styles from "../page.module.css";
import WhiteBinIcon from "./assets/WhiteBin";
/**
 * Custom hook for working with Field Arrays (dynamic forms). The motivation is to provide a better user experience and performance
 */
const Schema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: "Company name cannot be empty" }),
  experience: z
    .string()
    .trim()
    .min(1, { message: "Experience cannot be empty" })
    .refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, {
      message: "Experience must be a whole number and greater than 0",
    }),
});
const ExpForm = z.object({ expForm: z.array(Schema) });
type TExpForm = z.infer<typeof ExpForm>;

const defaultValues: TExpForm = {
  expForm: [{ companyName: "", experience: "" }],
};

const ChildComp = memo(({ str }: { str: string }) => {
  console.count("Child rendered");
  const [childCount, setChildCount] = useState(0);

  return (
    <>
      <div className={styles.people}>Child Component {childCount}</div>
      <button type="button" onClick={() => setChildCount((c) => c + 1)}>
        Update Child Count
      </button>
      <div>{str}</div>
    </>
  );
});
// defaultValues object passed to useFieldArray() needs to be an array(s)
const UseFieldArrComponent = () => {
  console.count("Parent rendered");
  const [count, setCount] = useState(0);
  const [childProp, setChildProp] = useState("Child prop");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TExpForm>({
    defaultValues,
    resolver: zodResolver(ExpForm),
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "expForm",
  });

  const onSubmit = async (data: TExpForm) => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 300);
    });

    console.log("Submitted:", data);
    reset();
  };

  return (
    <>
      <h2>UseFieldArrComponent</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className={styles.formHeader}>
                <h3 className={styles.headerTitle}>Experience {index + 1}</h3>
                <Link
                  href="#"
                  className={styles.headerAction}
                  onClick={() => index === 1 && remove(index)}
                >
                  <WhiteBinIcon />
                </Link>
              </div>
              <label className={styles.field}>
                <span className={styles.label}>Company</span>
                <input
                  placeholder="Company name"
                  type="text"
                  autoComplete="organization"
                  className={styles.input}
                  {...register(`expForm.${index}.companyName`)}
                />
                {errors?.expForm?.[index]?.companyName?.message && (
                  <div className={styles.error}>
                    {errors.expForm[index].companyName.message}
                  </div>
                )}
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Years worked</span>
                <input
                  placeholder="e.g. 3"
                  type="number"
                  className={styles.input}
                  {...register(`expForm.${index}.experience`)}
                />
                {errors?.expForm?.[index]?.experience?.message && (
                  <div className={styles.error}>
                    {errors.expForm[index].experience.message}
                  </div>
                )}
              </label>
            </div>
          );
        })}
        <Watch
          control={control}
          name="expForm"
          compute={(formArray) => {
            let total = 0;
            for (const form of formArray) {
              total += Number(form.experience);
            }
            return total;
          }}
          render={(total) => {
            return <div>Total years of experience: {total}</div>;
          }}
        />

        {count}
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Parent Update Count
        </button>
        <button type="button" onClick={() => setChildProp("New prop")}>
          Parent Update Prop
        </button>
        <ChildComp str={childProp} />
        <div className={styles.formFooter}>
          <button
            className={styles.button}
            type="button"
            onClick={() => append({ companyName: "", experience: "" })}
          >
            Add more experience
          </button>
          <button className={styles.button} type="submit">
            Submit experience(s)
          </button>
        </div>
      </form>
    </>
  );
};

export default UseFieldArrComponent;
