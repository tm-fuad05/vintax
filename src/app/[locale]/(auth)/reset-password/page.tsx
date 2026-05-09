"use client";

import Logo from "@/component/shared/logo";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* ── LEFT PANEL ── */}
      <div className="relative w-full md:w-[58%] h-56 sm:h-80 md:h-screen flex-shrink-0 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXIxqz4XslbZNXvCE_A3dc9OxYjU7Hr85hzGqs1xO3JGrd22ihbeRDiPOC8DQUgpn47OMDgYX1VE8al-I8uw2xyDXjZWhSD0K1j9lry9HV5raLKhIT16sWrbgN9WBmMaq4BM4_DHnKyCaKvSkt42PTVc6zEDPUWxlU0ENwtUGan1gGaOXVdXuJT1MsYLcrbEPpuUIF0ZU430ZnatuuUh9lxiSWTllXmFlg6_GG4_noN_c-hynl8ROri7GComYioKy0kG7yUCKw6_Y"
          alt="Streetwear hooded figure"
          className="h-full w-full object-cover object-top brightness-75"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

        {/* Tagline */}
        <div className="absolute bottom-8 left-8 right-8">
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
            Define Your
            <br />
            Street Identity.
          </h2>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 flex-col justify-between px-6 py-10 sm:px-10 md:px-14 lg:px-20 bg-white">
        <div className="flex flex-col justify-center flex-1">
          {/* Brand */}
          <div className="mb-10 md:mb-16">
            <Logo />
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-title mb-2">
            Create new password
          </h1>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-sm">
            Your new password must be different from previous passwords.
          </p>

          {/* Success Banner */}
          {submitted && (
            <div className="flex items-center gap-3 rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 mb-5 text-primary text-sm font-semibold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Password updated successfully!
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 mb-5 text-red-500 text-sm font-semibold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form className="space-y-3">
            {/* NewPass */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  // value={formData.password}
                  // onChange={changehandler}
                  placeholder="••••••••"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
              {/* {inputError.password && (
              <small className="text-red-500 font-medium block -mt-1 ml-1">
                Password must be at least {inputError.password.join(", ")}.
              </small>
            )} */}
            </div>
            {/* Confirm New Pass*/}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  name="confirmPassword"
                  // value={formData.confirmPassword}
                  // onChange={changehandler}
                  placeholder="••••••••"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
            </div>
            {/* {inputError.confirmPassword && (
              <small className="text-red-500 font-medium block mt-1 ml-1">
                {inputError.confirmPassword[0]}
              </small>
            )} */}
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-primary py-3.5 text-sm font-bold text-white tracking-wide transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Update Password
            </button>

            {/* Back to Login */}
            <Link
              href={"/sign-in"}
              className="text-gray-500 flex items-center justify-center gap-2 group mt-10"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-2 duration-200"
              />
              <span>Back to Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
