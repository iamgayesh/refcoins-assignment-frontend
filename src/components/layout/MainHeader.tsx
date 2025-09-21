// src/components/layout/MainHeader.tsx
"use client";

import Link from "next/link";
import CommonButton from "../ui/CommonButton";

export default function MainHeader() {

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          PropertyApp
        </Link>

        {/* Navigation + Login */}
        <div className="flex items-center gap-6">

          {/* Login Button (always visible at top right) */}
          <Link href="/login">
            <CommonButton label="Login" variant="primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}
