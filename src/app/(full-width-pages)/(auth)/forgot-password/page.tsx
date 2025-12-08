"use client";
import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, MailIcon, CheckCircleIcon } from "@/icons"; // Import icon cần thiết
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
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Link href="/signin" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
        <ChevronLeftIcon className="w-4 h-4" /> Back to Sign In
      </Link>

      {!isSuccess ? (
        <>
          <div className="mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 mb-6">
              <MailIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password? 🔒</h1>
            <p className="text-gray-500">
              No worries! Enter your email and we will send you reset instructions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border-gray-200 h-12"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold">
              {loading ? "Sending Link..." : "Send Reset Link"}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 animate-bounce">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email!</h2>
          <p className="text-gray-500 mb-8">
            We have sent a password reset link to <br/>
            <span className="font-medium text-gray-900">{email}</span>
          </p>
          
          <Button 
            onClick={() => window.open('https://gmail.com', '_blank')} 
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold mb-4"
          >
            Open Email App
          </Button>
          
          <button 
            onClick={() => setIsSuccess(false)} 
            className="text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            Click here to try another email
          </button>
        </div>
      )}
    </div>
  );
}