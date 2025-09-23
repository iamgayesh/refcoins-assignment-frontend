"use client";

import { ButtonHTMLAttributes } from "react";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  label: string;
}

export default function CommonButton({
  variant = "primary",
  label,
  ...props
}: CommonButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {label}
    </button>
  );
}
