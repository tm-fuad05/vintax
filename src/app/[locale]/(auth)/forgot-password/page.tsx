"use client";

import AuthButton from "@/component/shared/AuthButton";
import Logo from "@/component/shared/logo";
import { authClient } from "@/lib/auth-client";
import { emailSchema } from "@/ZodSchema/authSchema";
import { ArrowLeft, Mail, MailCheck, MailOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Zod Schema
    const emailValidation = emailSchema.safeParse(email);

    if (!emailValidation.success) {
      const error = emailValidation.error.issues[0]?.message;
      setErrorInput(error);
      return;
    }
    setErrorInput("");
    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
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
    <div className="h-screen w-full bg-background grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Editorial Showcase Panel - Static 100vh */}
      <div className="relative lg:col-span-6 hidden lg:block h-full overflow-hidden bg-title">
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop')",
          }}
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.65] h-full flex flex-col justify-between p-12 lg:p-16 z-0"
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
                RECOVERY ATELIER
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              RESTORE YOUR{" "}
              <span className="text-secondary italic font-serif font-normal">
                ATELIER ACCESS
              </span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Securely reset your password and regain access to your exclusive
              archival collections and luxury profile.
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
          {!submitted ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-secondary">
                  PASSWORD RECOVERY
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-title uppercase tracking-tight">
                  RESET YOUR{" "}
                  <span className="text-secondary italic font-serif font-normal">
                    PASSWORD
                  </span>
                </h2>
                <p className="text-xs text-gray-500">
                  Enter your registered email address to receive a secure
                  password reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-title">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        setErrorInput("");
                      }}
                      placeholder="name@domain.com"
                      className="w-full bg-surface border border-border py-3.5 pl-11 pr-4 text-xs text-title placeholder:text-gray-400 focus:outline-none focus:border-secondary transition-colors"
                    />
                    <Mail
                      size={16}
                      className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 group-focus-within:text-secondary transition-colors"
                    />
                  </div>
                  {errorInput && (
                    <span className="text-[11px] text-red-500 block pt-0.5">
                      {errorInput}
                    </span>
                  )}
                </div>

                <AuthButton loading={loading}>SEND RECOVERY LINK</AuthButton>
              </form>

              {/* Back to Login Link */}
              <div className="pt-4 border-t border-border text-center">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-secondary transition-colors group"
                >
                  <ArrowLeft
                    size={15}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span>BACK TO SIGN IN</span>
                </Link>
              </div>
            </>
          ) : (
            /* Success State Card */
            <div className="text-center space-y-6 bg-surface border border-border p-8 sm:p-10 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/40 flex items-center justify-center text-secondary mx-auto">
                <MailOpen size={28} />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary">
                  EMAIL DISPATCHED
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-title uppercase">
                  CHECK YOUR{" "}
                  <span className="text-secondary italic font-serif font-normal">
                    INBOX
                  </span>
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                  We have dispatched a password reset link to{" "}
                  <span className="font-mono text-title font-semibold">
                    {email}
                  </span>
                  . Please follow the instructions in the message.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center w-full bg-title text-white py-3.5 px-6 text-xs uppercase font-bold tracking-[0.2em] hover:bg-secondary hover:text-title transition-colors"
                >
                  RETURN TO SIGN IN
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
