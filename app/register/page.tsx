// app/register/page.tsx
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <RegisterForm />
    </div>
  );
}