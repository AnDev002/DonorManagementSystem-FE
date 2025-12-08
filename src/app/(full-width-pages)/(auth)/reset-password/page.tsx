"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { LockIcon, EyeIcon, EyeCloseIcon, ChevronLeftIcon } from "@/icons";
import { AuthService } from "@/services/AuthService";
import { Link } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await AuthService.resetPassword(token || "", password);
      alert("Password updated successfully! Please login.");
      router.push("/signin");
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return (
    <div className="text-center p-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
            <LockIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Invalid or Expired Link</h3>
        <p className="text-gray-500 mb-6">The password reset link is invalid or has expired.</p>
        <Link href="/forgot-password">
            <Button className="bg-red-600 text-white">Resend Link</Button>
        </Link>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 mb-6">
            <LockIcon className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Set New Password</h1>
        <p className="text-gray-500">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border-gray-200 h-12 pr-10"
              required
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-50 border-gray-200 h-12"
            required
          />
        </div>

        {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {error}
            </div>
        )}

        <Button type="submit" className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <Link href="/signin" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800">
            <ChevronLeftIcon className="w-4 h-4" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}