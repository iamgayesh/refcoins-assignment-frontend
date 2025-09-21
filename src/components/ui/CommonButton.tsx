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
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {label}
    </button>
  );
}
