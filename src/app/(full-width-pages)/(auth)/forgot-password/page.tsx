"use client";
import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, MailIcon } from "@/icons";
import { AuthService } from "@/services/AuthService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await AuthService.forgotPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      // Display error from backend or default error
      setError(err.message || "Failed to send email. Please check your email address again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        
        {/* Back Button */}
        <Link href="/signin" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon className="w-4 h-4" /> Back to sign in
        </Link>

        {!isSuccess ? (
          <>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#CF2222]">
                <MailIcon className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
              <p className="mt-2 text-sm text-gray-500">
                Don't worry, enter your email and we'll send you password reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <Label htmlFor="email">Registered Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your_email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:border-red-500 focus:ring-red-500/20"
                />
              </div>

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              <Button type="submit" className="w-full bg-[#CF2222] hover:bg-red-700 text-white" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <MailIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Email sent!</h2>
            <p className="mt-2 text-gray-500 mb-8">
              We have sent a password reset link to <br/>
              <span className="font-medium text-gray-900">{email}</span>
            </p>
            <Button onClick={() => window.open('https://gmail.com', '_blank')} className="w-full bg-[#CF2222] hover:bg-red-700 text-white mb-4">
              Open Mail App
            </Button>
            <button onClick={() => setIsSuccess(false)} className="text-sm font-semibold text-[#CF2222] hover:underline">
              Didn't receive it? Resend
            </button>
          </div>
        )}
      </div>
    </div>
  );
}