"use client";

import { authClient } from "@/lib/auth-client";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <button
        type="button"
        onClick={signInWithGoogle}
        className="w-full sm:w-1/2 py-3.5 px-4 flex justify-center items-center gap-2.5 bg-surface border border-border text-title text-xs uppercase font-extrabold tracking-wider hover:bg-title hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
      >
        <FcGoogle size={18} />
        <span>GOOGLE</span>
      </button>

      <button
        type="button"
        className="w-full sm:w-1/2 py-3.5 px-4 flex justify-center items-center gap-2.5 bg-surface border border-border text-title text-xs uppercase font-extrabold tracking-wider hover:bg-title hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
      >
        <BiLogoFacebookCircle className="text-[#1877F2]" size={18} />
        <span>FACEBOOK</span>
      </button>
    </div>
  );
}
