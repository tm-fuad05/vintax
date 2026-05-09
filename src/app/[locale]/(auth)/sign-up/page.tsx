"use client";

import { Lock, Mail, User } from "lucide-react";
import Logo from "@/component/shared/logo";

import Link from "next/link";
import { useState } from "react";
import { signUpInput, signUpSchema } from "@/ZodSchema/authSchema";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import SocialLogin from "@/component/shared/SocialLogin";
import { toast } from "sonner";
import AuthButton from "@/component/shared/AuthButton";

export default function SignUpForm() {
  const router = useRouter();
  const [inputError, setInputError] = useState<
    Record<string, string[] | undefined>
  >({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<signUpInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputError({ ...inputError, [name]: undefined });
  };

  // Zod Parse
  const formDataValidation = signUpSchema.safeParse(formData);

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
      await authClient.signUp.email(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            setLoading(false);
            toast.success("Successfully signed up");
            router.push("/sign-in");
          },
          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-hidden h-screen">
      <div className="relative lg:col-span-6 hidden lg:block">
        <div
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNmwb-RTZZUL9D3pkOjH-jANMp8YFLuM_vB4HSyc2D7IulYTF0MWXsf73-DqGVE5ZC55Mjmaai_uJh9LI9jtzjaz4gQQ2OpV0m8LSHS4QEm100lxG7-2n8bsXBfUdebEzYO5lrUwr0NqISWRhvtQqyxJn1CwSBL1LKuHEjmjCsqEwwx-ikxMyuw8SDsJ1mY3DIn8cS_A3kXHrYV-3qkjojCJkQGrUkYm-VIsPP_BUSe-bwBhsI20TqSvdJDei358j4a4HytMbuIC8')",
          }}
          className="absolute inset-0 bg-cover h-screen flex flex-col justify-between p-10 gap-2"
        >
          {/* Overlay */}
          <div className="absolute bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent inset-0 h-screen" />
          <div className="z-10">
            <Logo />
          </div>
          <div className="z-10 space-y-2">
            <h1 className="capitalize text-5xl font-black text-white ">
              define your <br />
              <span className="text-primary">street identitiy.</span>
            </h1>{" "}
            <p className="text-white text-sm">
              Join the world's most exclusive community of streetwear
              collectors, <br />
              designers, and enthusiasts.
            </p>
          </div>
          <div className="flex gap-8 z-10">
            <p className="text-gray-400 text-sm">© 2026 Vintax Collective</p>
            <li className="text-gray-400 text-sm list-disc">Privacy Policy</li>
          </div>
        </div>
      </div>
      {/* Form */}
      <div className="overflow-y-auto lg:col-span-6 flex">
        <div className="flex flex-col gap-5 justify-center p-20 py-8">
          <div className="space-y-1  mb-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800">
              Create your account
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Join the community of streetwear enthusiasists.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changehandler}
                  placeholder="Enter your name"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <User
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
              {inputError.name && (
                <small className="text-red-500 font-medium block -mt-1 ml-1">
                  {inputError.name[0]}
                </small>
              )}
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative group">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={changehandler}
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
            {/* Passwords */}
            <div className="grid grid-cols-2 gap-3">
              {/* Pass */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changehandler}
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
                    Password must be at least {inputError.password?.join(", ")}.
                  </small>
                )}
              </div>
              {/* Confirm */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changehandler}
                    placeholder="••••••••"
                    className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Lock
                    size={20}
                    className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                  />
                </div>
                {inputError.confirmPassword && (
                  <small className="text-red-500 font-medium block -mt-1 ml-1">
                    {inputError.confirmPassword[0]}
                  </small>
                )}
              </div>
            </div>
            {/* Button */}
            <AuthButton loading={loading}>Sign Up</AuthButton>
          </form>
          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px grow bg-gray-300" />
            <p className="uppercase text-sm text-gray-500 font-medium">
              or sign up with
            </p>
            <div className="h-px grow bg-gray-300" />
          </div>
          {/* OAuth Login */}
          <SocialLogin />
          <p className="text gray-600 text-center">
            Already have an account?{" "}
            <Link href={"sign-in"} className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>{" "}
    </div>
  );
}
