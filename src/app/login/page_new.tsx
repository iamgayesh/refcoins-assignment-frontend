"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser, clearError } from "../../redux/slices/authSlice";
import CommonButton from "../../components/ui/CommonButton";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({ username: "", password: "" });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          username: form.username.trim(),
          password: form.password,
        })
      ).unwrap();

      if (result) {
        router.push("/dashboard");
      }
    } catch (error) {
      // Error is handled by Redux
      console.error("Login failed:", error);
    }
  };

  const handleInputChange = (field: "username" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />

          <CommonButton
            type="submit"
            label={loading ? "Logging in..." : "Login"}
            variant="primary"
            disabled={loading || !form.username.trim() || !form.password.trim()}
          />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Test credentials: admin / admin123
        </p>
      </div>
    </div>
  );
}
