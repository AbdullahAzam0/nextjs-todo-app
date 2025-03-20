// app/edit/[id]/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  // Fetch the task data
  const task = await prisma.task.findUnique({
    where: {
      id: params.id,
    },
  });

  // Check if task exists and belongs to the current user
  if (!task || task.userId !== session.user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Task</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <EditTaskFormWrapper id={params.id} content={task.content} />
        </div>
      </div>
    </div>
  );
}

// This wrapper allows us to keep the page as a server component
function EditTaskFormWrapper({ id, content }: { id: string; content: string }) {
  return <EditTaskForm id={id} initialContent={content} />;
}