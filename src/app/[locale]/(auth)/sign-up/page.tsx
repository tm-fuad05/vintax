"use client";

import { Camera, Lock, Mail, User } from "lucide-react";
import Logo from "@/component/shared/logo";

import Link from "next/link";
import { useState } from "react";
import { signUpInput, signUpSchema } from "@/ZodSchema/authSchema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import SocialLogin from "@/component/shared/SocialLogin";
import { toast } from "sonner";
import AuthButton from "@/component/shared/AuthButton";

export default function SignUpForm() {
  const router = useRouter();
  const [inputError, setInputError] = useState<
    Record<string, string[] | undefined>
  >({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<signUpInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputError({ ...inputError, [name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Zod Parse
    const formDataValidation = signUpSchema.safeParse(formData);

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
          image: imagePreview!,
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
    <div className="h-screen w-full bg-background grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Editorial Showcase Panel - Static 100vh */}
      <div className="relative lg:col-span-6 hidden lg:block h-full overflow-hidden bg-title">
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop')",
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
                ATELIER REGISTRATION
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              DEFINE YOUR{" "}
              <span className="text-secondary italic font-serif font-normal">
                STREET IDENTITY
              </span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Join the world's most exclusive community of luxury streetwear
              collectors, designers, and haute couture enthusiasts.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-gray-400">
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
        className="lg:col-span-6 h-full overflow-y-auto flex flex-col items-center px-6 sm:px-12 py-16 lg:py-10 w-full"
      >
        <div className="w-full max-w-md space-y-8 my-auto">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-secondary">
              NEW MEMBER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-title uppercase tracking-tight">
              CREATE YOUR{" "}
              <span className="text-secondary italic font-serif font-normal">
                ACCOUNT
              </span>
            </h2>
            <p className="text-xs text-gray-500">
              Fill in your details to join the Vintax Archival Atelier.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
                FULL NAME
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changehandler}
                  placeholder="Enter your full name"
                  className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                />
                <User
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                />
              </div>
              {inputError.name && (
                <span className="text-[11px] text-red-500 block pt-0.5">
                  {inputError.name[0]}
                </span>
              )}
            </div>

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
                  onChange={changehandler}
                  placeholder="name@domain.com"
                  className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                />
                <Mail
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                />
              </div>
              {inputError.email && (
                <span className="text-[11px] text-red-500 block pt-0.5">
                  {inputError.email[0]}
                </span>
              )}
            </div>

            {/* Passwords Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
                  PASSWORD
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changehandler}
                    placeholder="••••••••••••"
                    className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <Lock
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                  />
                </div>
                {inputError.password && (
                  <span className="text-[11px] text-red-500 block pt-0.5">
                    Password must be at least {inputError.password?.join(", ")}.
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
                  CONFIRM PASSWORD
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changehandler}
                    placeholder="••••••••••••"
                    className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <Lock
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                  />
                </div>
                {inputError.confirmPassword && (
                  <span className="text-[11px] text-red-500 block pt-0.5">
                    {inputError.confirmPassword[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Photo Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
                PROFILE PHOTO
              </label>
              <div className="group/photo flex items-center justify-between p-3.5 bg-surface border border-dashed border-border hover:border-secondary transition-colors">
                <div className="flex items-center gap-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-10 h-10 rounded-full object-cover border border-secondary"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-title/5 flex items-center justify-center text-gray-400 group-hover/photo:text-secondary group-hover/photo:bg-secondary/10 transition-colors">
                      <Camera size={18} />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-xs font-semibold text-title group-hover/photo:text-secondary transition-colors line-clamp-1 select-none">
                      {imagePreview
                        ? "Photo Selected"
                        : "Upload Profile Picture"}
                    </p>
                  </div>
                </div>

                <label htmlFor="profile-photo-upload">
                  <span className="px-3.5 py-2 bg-title text-white text-[10px] uppercase font-bold tracking-widest group-hover/photo:bg-secondary group-hover/photo:text-title transition-all duration-300 cursor-pointer">
                    {imagePreview ? "CHANGE" : "CHOOSE FILE"}
                  </span>
                </label>
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Auth Submit Button */}
            <AuthButton loading={loading}>CREATE ACCOUNT</AuthButton>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-background px-4 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              OR JOIN WITH
            </span>
          </div>

          {/* OAuth Social Login */}
          <SocialLogin />

          {/* Footer Link */}
          <p className="text-center text-xs text-gray-500 pt-4">
            ALREADY HAVE AN ATELIER ACCOUNT?{" "}
            <Link
              href="/sign-in"
              className="text-secondary font-bold hover:underline ml-1"
            >
              LOG IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
