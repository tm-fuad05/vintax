"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowBigRight, ArrowRight, Lock, Mail, User } from "lucide-react";
import Logo from "@/component/shared/logo";
import { FcGoogle } from "react-icons/fc";
import {
  BiLogoFacebookCircle,
  BiRightArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("SignUp");

  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <div>Loading...</div>;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <div>Loading...</div>;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId,
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
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error("Sign-up attempt not complete:", signUpAttempt);
        console.error("Sign-up attempt status:", signUpAttempt.status);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the code
  if (verifying) {
    return (
      <>
        <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-hidden h-screen">
      <div className="relative lg:col-span-7 hidden lg:block">
        <div
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNmwb-RTZZUL9D3pkOjH-jANMp8YFLuM_vB4HSyc2D7IulYTF0MWXsf73-DqGVE5ZC55Mjmaai_uJh9LI9jtzjaz4gQQ2OpV0m8LSHS4QEm100lxG7-2n8bsXBfUdebEzYO5lrUwr0NqISWRhvtQqyxJn1CwSBL1LKuHEjmjCsqEwwx-ikxMyuw8SDsJ1mY3DIn8cS_A3kXHrYV-3qkjojCJkQGrUkYm-VIsPP_BUSe-bwBhsI20TqSvdJDei358j4a4HytMbuIC8')",
          }}
          className="absolute inset-0 bg-cover h-screen flex flex-col justify-between p-10 gap-2"
        >
          <div className="z-10">
            <Logo />
          </div>
          <div className="z-10 space-y-2">
            <h1 className="capitalize text-5xl font-bold text-white ">
              define your <br />
              <span className="text-primary">street identitiy.</span>
            </h1>
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
        <div className="absolute bg-linear-to-t from-black to-transparent inset-0 h-screen" />
      </div>
      {/* Form */}
      <div className="flex flex-col gap-5 justify-center p-20 py-8 lg:col-span-5">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Create your account
          </h2>
          <p className="text-paragraph text-sm md:text-md font-medium">
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
                name="fullname"
                placeholder="Enter your name"
                className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <User
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
              />
            </div>
          </div>
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
                  placeholder="••••••••"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
            </div>
            {/* Confirm */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="••••••••"
                  className="rounded-xl ring-1 ring-gray-300 w-full py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 group-focus-within:text-primary"
                />
              </div>
            </div>
          </div>
          {/* Button */}
          <button className="text-white bg-primary py-3 rounded-xl w-full mt-2 text-sm flex items-center justify-center gap-2 group hover:bg-blue-700 duration-200 cursor-pointer">
            <span>Sign Up</span>
            <ArrowRight className="group-hover:translate-x-2 duration-200" />
          </button>
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
          Already have an account?{" "}
          <Link href={"sign-in"} className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>{" "}
    </div>
  );
}
