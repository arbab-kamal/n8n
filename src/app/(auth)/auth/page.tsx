"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client"; // ✅ we’ll create this wrapper below

// ✅ Google icon SVG
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.6 2 24 2C11.854 2 2 11.854 2 24s9.854 22 22 22s22-9.854 22-22c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-1.211 2.376-1.896 5.05-1.896 7.915s.685 5.539 1.896 7.915L2.062 34.69C.802 31.644 0 28.026 0 24s.802-7.644 2.062-10.69L6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 46c5.94 0 11.218-1.972 15.003-5.361L32.678 34.89c-2.008 1.521-4.634 2.443-7.678 2.443c-5.22 0-9.651-3.337-11.28-7.915L6.306 34.095C10.082 41.622 16.549 46 24 46z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.524L38.802 39.16C42.223 35.823 44 30.298 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </svg>
);

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  // ✅ New loading state for Google button
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === "signIn") {
        await signIn.email({ email: formData.email, password: formData.password });
      } else {
        await signUp.email({ email: formData.email, password: formData.password, name: formData.name });
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed. Check console.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsGoogleLoading(true); // ✅ start loading
      await signIn.social({ provider: "google" });
    } catch (err) {
      console.error("Google auth error:", err);
      setIsGoogleLoading(false); // stop loading if error
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-2xl">
          {/* Tab Switch (unchanged) */}
          <div className="mb-8 flex justify-center rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setActiveTab("signIn")}
              className={`w-1/2 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === "signIn" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signUp")}
              className={`w-1/2 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === "signUp" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form (unchanged) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signUp" && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={activeTab === "signIn" ? "Enter your password" : "Create a password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {activeTab === "signIn" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google login with loading */}
          <button
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
            className={`flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-800 shadow-sm transition-transform hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
              isGoogleLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isGoogleLoading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <GoogleIcon />
            )}
            <span>{isGoogleLoading ? "Loading..." : "Continue with Google"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}