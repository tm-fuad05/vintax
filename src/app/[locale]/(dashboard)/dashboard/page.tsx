import { redirect } from "next/navigation";

const role: "ADMIN" | "USER" = "USER";
export default function DashboardRootPage() {
  if (role == "ADMIN") redirect("/dashboard/admin");
  else redirect("/dashboard/user");
}
