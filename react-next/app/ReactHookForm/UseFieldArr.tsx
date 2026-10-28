"use client";

import Link from "next/link";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
    .min(1, { message: "Experience cannot be empty" }),
});

const ExpForm = z.object({ expForm: z.array(Schema) });
type TExpForm = z.infer<typeof ExpForm>;

const defaultValues: TExpForm = {
  expForm: [{ companyName: "", experience: "" }],
};
// defaultValues object passed to useFieldArray() needs to be an array(s)
const UseFieldArrComponent = () => {
  const { register, control, handleSubmit, getValues } = useForm<TExpForm>({
    defaultValues,
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "expForm",
  });
  const formArray = useWatch({
    control,
    name: "expForm",
  });

  let totalExperience = 0;
  formArray.forEach((item, i) => {
    totalExperience += Number(item.experience);
    console.log("item.experience::", Number(item.experience), "i::", i);

    console.log("totalExperience::", totalExperience);

    return totalExperience;
  });
  // console.log(formArray);
  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <h2>UseFieldArrComponent</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className={styles.formHeader}>
              <h3 className={styles.headerTitle}>Experience {index + 1}</h3>
              <Link
                href="#"
                className={styles.headerAction}
                onClick={() => index > 0 && remove(index)}
              >
                <WhiteBinIcon />
              </Link>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>Company</span>
              <input
                type="text"
                className={styles.input}
                {...register(`expForm.${index}.companyName`)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Years worked</span>
              <input
                type="number"
                className={styles.input}
                {...register(`expForm.${index}.experience`)}
              />
            </label>
          </div>
        ))}

        <div>Total years of experience: {totalExperience}</div>
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
