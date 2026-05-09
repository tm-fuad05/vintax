import { ArrowRight } from "lucide-react";

export default function AuthButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="text-white bg-primary py-3 rounded-xl w-full mt-2 text-sm flex items-center justify-center gap-2 group hover:bg-blue-700 duration-200 cursor-pointer">
      <span>{children}</span>
      <ArrowRight className="group-hover:translate-x-2 duration-200" />
    </button>
  );
}
