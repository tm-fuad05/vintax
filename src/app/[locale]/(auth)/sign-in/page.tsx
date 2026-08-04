"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import Logo from "@/component/shared/logo";
import SocialLogin from "@/component/shared/SocialLogin";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { signInInput, signInSchema } from "@/ZodSchema/authSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthButton from "@/component/shared/AuthButton";

export default function SignInForm() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState<
    Record<string, string[] | undefined>
  >({});
  const [formData, setFormData] = useState<signInInput>({
    email: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputError({ ...inputError, [name]: [] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod Parse
    const formDataValidation = signInSchema.safeParse(formData);

    if (!formDataValidation.success) {
      const error = formDataValidation.error.flatten().fieldErrors;
      setInputError(error);
      return;
    }
    setInputError({});
    setLoading(true);
    try {
      await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
          callbackURL: "/",
        },
        {
          //callbacks
          onSuccess: (ctx) => {
            setLoading(false);
            toast.success("Successfully signed in");
            router.push("/");
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error: any) {
      toast.error(JSON.stringify(error));
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full bg-background grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Editorial Showcase Panel - Static 100vh */}
      <div className="relative lg:col-span-6 hidden lg:block h-screen overflow-hidden bg-title">
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop')",
          }}
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.7] h-full flex flex-col justify-between p-12 lg:p-16 z-0"
        />
        {/* Luxury Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-title via-title/60 to-title/40 z-10" />

        {/* Textured Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

        {/* Overlay Content */}
        <div className="relative z-20 h-full flex flex-col justify-between p-12 lg:p-16">
          <div>
            <Logo isDark={true} />
          </div>

          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 border border-secondary/40 bg-secondary/10 px-3 py-1 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">
                MEMBER ARCHIVE ACCESS
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              ARCHIVAL{" "}
              <span className="text-secondary italic font-serif font-normal">
                ATELIER
              </span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Enter the inner circle of luxury streetwear collectors, bespoke
              drop archives, and haute couture releases.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px]  text-gray-400">
            <span>© 2026 VINTAX ARCHIVE</span>
            <span className="w-1 h-1 rounded-full bg-secondary/50" />
            <Link
              href="/privacy-policy"
              className="hover:text-secondary transition-colors"
            >
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>

      {/* Right Form Container - Independent Scroll */}
      <div
        data-lenis-prevent
        className="lg:col-span-6 h-full overflow-y-auto flex flex-col items-center px-6 sm:px-12 w-full"
      >
        <div className="w-full max-w-md space-y-8 my-auto">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-secondary">
              MEMBER LOGIN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-title uppercase tracking-tight">
              SIGN IN TO YOUR{" "}
              <span className="text-secondary italic font-serif font-normal">
                ACCOUNT
              </span>
            </h2>
            <p className="text-xs text-gray-500 ">
              Enter your credentials to access your private archive & orders.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
                EMAIL ADDRESS
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="name@domain.com"
                  className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title  placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                />
                <Mail
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                />
              </div>
              {inputError.email && (
                <span className="text-[11px] text-red-500  block pt-0.5">
                  {inputError.email[0]}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em]">
                <label className="text-title">PASSWORD</label>
                <Link
                  href="/forgot-password"
                  className="text-secondary hover:underline "
                >
                  FORGOT PASSWORD?
                </Link>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="••••••••••••"
                  className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title  placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                />
                <Lock
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                />
              </div>
              {inputError.password && (
                <span className="text-[11px] text-red-500  block pt-0.5">
                  {inputError.password[0]}
                </span>
              )}
            </div>

            {/* Auth Button */}
            <AuthButton loading={loading}>SIGN IN</AuthButton>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-background px-4 text-[10px] uppercase tracking-[0.2em]  text-gray-400">
              OR CONTINUE WITH
            </span>
          </div>

          {/* OAuth Social Login */}
          <SocialLogin />

          {/* Footer Link */}
          <p className="text-center text-xs text-gray-500  pt-4">
            DON'T HAVE AN ATELIER ACCOUNT?{" "}
            <Link
              href="/sign-up"
              className="text-secondary font-bold hover:underline ml-1"
            >
              CREATE ACCOUNT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
