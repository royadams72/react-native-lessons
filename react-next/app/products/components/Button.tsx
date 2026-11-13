"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import styles from "../../page.module.css";

export type TaskType = "back" | "forward";
export type ButtonType = "button" | "submit" | "reset";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: ButtonType;
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  small?: boolean;
  task?: TaskType;
};

function Button({
  href,
  small = false,
  type = "button",
  task,
  children,
  onClick,
  ...buttonProps
}: ButtonProps) {
  const router = useRouter();
  const buttonStyles = `${styles.button} ${small && styles.buttonSmall}`;
  return (
    <button
      type={type}
      {...buttonProps}
      onClick={() => {
        task === "back"
          ? router.back()
          : task === "forward"
            ? router.forward()
            : null;
        onClick?.();
        console.log("clicked", task);
      }}
      className={buttonStyles}
    >
      {children}
    </button>
  );
}

export default Button;
