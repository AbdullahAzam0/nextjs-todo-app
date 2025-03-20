// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-gray-900">
          Organize your tasks with ease
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A simple, fast, and responsive Todo application to help you stay organized and productive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}