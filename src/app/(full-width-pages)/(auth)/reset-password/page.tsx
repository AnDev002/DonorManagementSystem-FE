"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { LockIcon, EyeIcon, EyeCloseIcon } from "@/icons";
import { AuthService } from "@/services/AuthService";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Lấy token từ URL
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Confirm password not match!");
      return;
    }
    if (!token) {
      setError("Invalid token or link problem.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await AuthService.resetPassword(token, password);
      alert("Change password successful! Redirecting to the login page...");
      router.push("/signin");
    } catch (err: any) {
      setError(err.message || "Token has expired or is invalid.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-red-600 font-medium text-lg">The link is invalid or has expired.</p>
            <Button onClick={() => router.push('/forgot-password')} className="mt-4 bg-[#CF2222] text-white">
                Request a new link
            </Button>
        </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#CF2222]">
            <LockIcon className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset a new Password</h1>
          <p className="mt-2 text-sm text-gray-500">Password need have at least 6 characters.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Label>New Password</Label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:border-red-500 focus:ring-red-500/20"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeIcon className="w-5 h-5"/> : <EyeCloseIcon className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="focus:border-red-500 focus:ring-red-500/20"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center font-medium">{error}</p>}

          <Button type="submit" className="w-full bg-[#CF2222] hover:bg-red-700 text-white" disabled={loading}>
            {loading ? "Updating..." : "Save password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// Bọc component trong Suspense để tránh lỗi "useSearchParams() should be wrapped in a suspense boundary" của Next.js
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}