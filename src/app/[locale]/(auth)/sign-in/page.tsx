"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import Logo from "@/component/shared/logo";
import SocialLogin from "@/component/shared/SocialLogin";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { signInInput, signInSchema } from "@/ZodSchema/authSchema";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthButton from "@/component/shared/AuthButton";
import { router } from "better-auth/api";

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

  // Zod Parse
  const formDataValidation = signInSchema.safeParse(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-hidden h-screen">
      <div className="relative lg:col-span-6 hidden lg:block">
        <div
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBua1CjxHP6Q2QImd8Ho7xy6on7U-yv2WR_4-1HRD2s1Amdy7nRdvoTH0c0m9urc5Zv87AL1lllKi_1cTItI_jS651idKaWEbs2Xry51GDQh6tbpyAyV2ZzbW0lO19RF_EJlQTxNr-0hFUCRLFKG4T2vPZ3Z1YQtV6W4tcjvRMO59EPBuhcOGpx5TevS0-F-Rm5sV0sQD2PEHQZixt_rBxPkPjF1FCsRgiYaW3YcXsvbXekxvCOH5fQGhSrHmb-Su_G-ytmjt9zhoI')",
          }}
          className="absolute inset-0 bg-cover h-screen flex flex-col justify-between p-10 gap-2"
        >
          <div className="z-10">
            <Logo />
          </div>
          <div className="z-10 space-y-2">
            <h1 className="capitalize text-5xl font-black text-white ">
              manage your <br /> assets with <br /> clarity
            </h1>
            <p className="text-white text-sm">
              Join the world's most exclusive community of streetwear
              collectors, <br />
              designers, and enthusiasts.
            </p>
          </div>
          <div className="flex gap-8 z-10">
            <p className="text-white text-sm">© 2026 Vintax Collective</p>
            <li className="text-white text-sm list-disc">Privacy Policy</li>
          </div>
        </div>
        {/* Blue Overlay */}
        <div className="absolute bg-linear-to-t from-primary/80 via-primary/50 to-transparent inset-0 h-screen" />
      </div>
      {/* Form */}
      <div className="flex flex-col gap-5 justify-center p-20 py-8 lg:col-span-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
            Enter your details to access your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Your email address"
                className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
              />
            </div>
            {inputError.email && (
              <small className="text-red-500 font-medium block -mt-1 ml-1">
                {inputError.email[0]}
              </small>
            )}
          </div>

          {/* Pass */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm ">
              <label className="font-medium text-gray-700">Password</label>
              <Link
                href={"/forgot-password"}
                className="text-primary font-semibold"
              >
                Fotgot password?
              </Link>
            </div>
            <div className="relative group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="••••••••"
                className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Lock
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
              />
            </div>
            {inputError.password && (
              <small className="text-red-500 font-medium block -mt-1 ml-1">
                {inputError.password[0]}
              </small>
            )}
          </div>

          {/* Button */}
          <AuthButton loading={loading}>Sign In</AuthButton>
        </form>
        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-px grow bg-gray-300" />
          <p className="uppercase text-sm text-gray-500 font-medium">
            or sign in with
          </p>
          <div className="h-px grow bg-gray-300" />
        </div>
        {/* OAuth Login */}
        <SocialLogin />
        <p className="text gray-600 text-center">
          Don't have an account?{" "}
          <Link href={"sign-up"} className="text-primary font-semibold">
            Create account
          </Link>
        </p>
      </div>{" "}
    </div>
  );
}
