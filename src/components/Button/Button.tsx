import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { Variant, Size } from "./Button.types.ts";
import { buttonVariants } from "./Button.helpers.ts";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
};

export { Button };
