"use client";

import AuthButton from "@/component/shared/AuthButton";
import Logo from "@/component/shared/logo";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema, resetPasswordType } from "@/ZodSchema/authSchema";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState<resetPasswordType>({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [inputError, setInputError] = useState<
    Record<string, string[] | undefined>
  >({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const formDataValidation = resetPasswordSchema.safeParse(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!formDataValidation.success) {
      const error = formDataValidation.error.flatten().fieldErrors;
      setInputError(error);
      return;
    }
    setInputError({});
    setLoading(true);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        return;
      }
      const { data, error } = await authClient.resetPassword({
        newPassword: formData.newPassword,
        token,
      });

      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      if (data.status) {
        setLoading(false);
        toast.success("Password reset successfull!");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
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

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* NewPass */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  value={formData.newPassword}
                  onChange={changeHandler}
                  placeholder="••••••••"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
              {inputError.newPassword && (
                <small className="text-red-500 font-medium block -mt-1 ml-1">
                  Password must be at least {inputError.newPassword.join(", ")}.
                </small>
              )}
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
                  value={formData.confirmNewPassword}
                  placeholder="••••••••"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
            </div>
            {inputError.confirmNewPassword && (
              <small className="text-red-500 font-medium block mt-1 ml-1">
                {inputError.confirmNewPassword[0]}
              </small>
            )}
            {/* Submit Button */}
            <AuthButton loading={loading}>Update Password</AuthButton>

            {/* Back to Login */}
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
      </div>
    </div>
  );
}
