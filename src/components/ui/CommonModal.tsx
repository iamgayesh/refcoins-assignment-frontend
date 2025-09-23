"use client";

import React from "react";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-md", // ~28rem
  md: "max-w-lg", // ~32rem
  lg: "max-w-xl", // ~36rem
  xl: "max-w-2xl", // ~42rem
};

interface CommonModalProps {
  children: React.ReactNode;
  size?: ModalSize;
  title?: React.ReactNode;
  showModal: boolean;
  handleClose: () => void;
}

export default function CommonModal({
  children,
  size = "md",
  title,
  showModal,
  handleClose,
}: CommonModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={handleClose}
        className="absolute inset-0 w-full h-full bg-black/10 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-[92%] sm:w-auto ${sizeMap[size]} bg-gray-800 text-white rounded-xl shadow-2xl border border-gray-700`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="font-bold text-base sm:text-lg">{title}</div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1.5 rounded hover:bg-white/10 text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}
