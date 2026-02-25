"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { EmailCodeFactor } from "@clerk/types";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Logo from "@/component/shared/logo";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showEmailCode, setShowEmailCode] = React.useState(false);
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Handle pending session tasks
              // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else if (signInAttempt.status === "needs_second_factor") {
        // Check if email_code is a valid second factor
        // This is required when Client Trust is enabled and the user
        // is signing in from a new device.
        // See https://clerk.com/docs/guides/secure/client-trust
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor =>
            factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        }
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the email verification code
  const handleEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display email code verification form
  if (showEmailCode) {
    return (
      <>
        <h1>Verify your email</h1>
        <p>A verification code has been sent to your email.</p>
        <form onSubmit={handleEmailCode}>
          <div>
            <label htmlFor="code">Enter verification code</label>
            <input
              onChange={(e) => setCode(e.target.value)}
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              value={code}
            />
          </div>
          <button type="submit">Verify</button>
        </form>
      </>
    );
  }

  // Display a form to capture the user's email and password
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-hidden h-screen">
      <div className="relative lg:col-span-7 hidden lg:block">
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
            <h1 className="capitalize text-5xl font-bold text-white ">
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
        <div className="absolute bg-linear-to-t from-primary via-primary/80 to-transparent inset-0 h-screen" />
      </div>
      {/* Form */}
      <div className="flex flex-col gap-5 justify-center p-20 py-8 lg:col-span-5">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Welcome Back
          </h2>
          <p className="text-paragraph text-sm md:text-md font-medium">
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
                placeholder="Your email address"
                className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
              />
            </div>
          </div>
          {/* Passwords */}

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
                placeholder="••••••••"
                className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Lock
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
              />
            </div>
          </div>

          {/* Button */}
          <button className="text-white bg-primary py-3 rounded-xl w-full mt-2 text-sm flex items-center justify-center gap-2 group hover:bg-blue-700 duration-200 cursor-pointer">
            <span>Sign In</span>
            <ArrowRight className="group-hover:translate-x-2 duration-200" />
          </button>
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
        <div className="flex gap-2 w-full">
          <button className="w-1/2 py-3 flex justify-center gap-2 items-center rounded-xl border border-gray-300 text-sm hover:bg-gray-200 duration-200 cursor-pointer">
            <FcGoogle size={20} />
            <span className="font-semibold">Google</span>
          </button>
          <button className="w-1/2 py-3 flex justify-center gap-2 items-center rounded-xl border border-gray-300 text-sm hover:bg-gray-200 duration-200 cursor-pointer">
            <BiLogoFacebookCircle className="text-primary" size={20} />
            <span className="font-semibold">Facebook</span>
          </button>
        </div>
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
