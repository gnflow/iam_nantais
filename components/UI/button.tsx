import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({ variant = "default", className = "", ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg transition-all";
  const variantStyles =
    variant === "default"
      ? "bg-gray-800 text-white hover:bg-gray-700"
      : "border border-gray-800 text-gray-800 hover:bg-gray-100";

  return <button className={`${baseStyles} ${variantStyles} ${className}`} {...props} />;
}
