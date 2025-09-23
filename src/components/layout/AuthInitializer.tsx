"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { restoreAuth } from "../../redux/slices/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Try to restore auth state from sessionStorage on app load
    dispatch(restoreAuth());
  }, [dispatch]);

  return <>{children}</>;
}
