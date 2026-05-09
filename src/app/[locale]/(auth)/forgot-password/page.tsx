"use client";

import AuthButton from "@/component/shared/AuthButton";
import Logo from "@/component/shared/logo";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function ResetPassword() {
  const [email, setEmail] = useState<emailType>("");
  const [submitted, setSubmitted] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  // Zod Schema
  const emailSchema = z.email("Invalid email address").trim();
  type emailType = z.infer<typeof emailSchema>;
  const emailValidation = emailSchema.safeParse(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailValidation.success) {
      const error = emailValidation.error.issues[0]?.message;
      setErrorInput(error);
      return;
    }
    setErrorInput("");

    const { data, error } = await authClient.requestPasswordReset({
      email: email,
      redirectTo: "/reset-password",
    });

    if (data?.status) setSubmitted(true);
    if (error) toast.error(error.message);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* ── LEFT PANEL ── */}
      <div className="relative w-full md:w-1/2 h-56 sm:h-72 md:h-screen flex-shrink-0 overflow-hidden hidden lg:block">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmeiy3nu3WpbtBPHSBwx9dpI-NC7Ergs1Sz0943k-CmTRJZ1hj2ntmQsp1O_SVyWhlbRNXG96HO0x5rzM-k5HcnOHDzH9zwwWh3oKE3iqG05rkaYYDBH40TzGBeXUvQ5DYCNmBJ90vl5-4C3tO0FP7letFj4yJFzdcoXu8Ep4D4IgrVuwqJ2mLc9ljFppXNfjItM7a1jZ6NNCLZBy2c3wA5RxjddRuy4WLGLTyrcvq3PDT1555q8UtGfu9CW7i94ts-g2bgauwaMI"
          alt="Streetwear model"
          className="h-full w-full object-cover object-top brightness-75"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

        {/* Tagline — hidden on small, shown md+ */}
        <div className="absolute bottom-8 left-8 right-8 hidden sm:block">
          <h2 className="text-5xl font-black leading-tight text-white tracking-tight">
            Define Your
            <br />
            Street Identity.
          </h2>
        </div>

        {/* Tagline — shown only on small */}
        <div className="absolute bottom-5 left-5 right-5 block sm:hidden">
          <h2 className="text-2xl font-black leading-tight text-white tracking-tight">
            Define Your Street Identity.
          </h2>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 md:px-16 lg:px-20 bg-white">
        {/* Brand */}
        <div className="mb-10 md:mb-16">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800 mb-2">
          Reset your password
        </h1>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-sm">
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
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
            Reset link sent! Check your inbox.
          </div>
        )}

        <form onClick={handleSubmit} className="space-y-3">
          {/* Email */}
          <div className="space-y-2">
            <div className="relative group">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Your email address"
                className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
              />
            </div>
            {errorInput && (
              <small className="text-red-500 font-medium block -mt-1 ml-1">
                {errorInput}
              </small>
            )}
          </div>
          {/* Button */}
          <AuthButton>Send Reset Link</AuthButton>
          {/* back to login */}
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
  );
}
