"use client";

import AuthButton from "@/component/shared/AuthButton";
import Logo from "@/component/shared/logo";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Mail, MailCheck, MailOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

// Zod Schema
const emailSchema = z.email().trim();

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidation = emailSchema.safeParse(email);

    if (!emailValidation.success) {
      const error = emailValidation.error.issues[0]?.message;
      setErrorInput(error);
      return;
    }
    setErrorInput("");
    setLoading(true);

    try {
      const { data, error } = await authClient.requestPasswordReset({
        email: email,
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (error: any) {
      toast.error(error);
      setLoading(false);
    }
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
      {!submitted ? (
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

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div className="space-y-2">
              <div className="relative group">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setErrorInput("");
                  }}
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
            <AuthButton loading={loading}>Send Reset Link</AuthButton>
            {/* back to login */}
            <Link
              href={"/sign-in"}
              className="text-gray-500 flex items-center justify-center gap-2 group mt-10 w-fit mx-auto"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-2 duration-200"
              />
              <span>Back to Login</span>
            </Link>
          </form>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-white p-6 font-sans">
          <div className="w-full rounded-2xl p-10 text-center">
            {/* Icon Area */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-slate-50 rounded-full">
                <MailOpen className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Text Content */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800 mb-3">
              Check your email
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              We have sent a password reset link to your email address. Please
              click the link in the message to set a new password.
            </p>

            {/* Back to Login */}
            <div className="mt-10 pt-6 border-t border-slate-100">
              <Link
                href={"/sign-in"}
                className="text-gray-500 flex items-center justify-center gap-2 group mt-10 w-fit mx-auto"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-2 duration-200"
                />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
