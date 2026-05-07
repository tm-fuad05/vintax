import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  return (
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
  );
}
