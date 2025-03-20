// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AddTask } from "@/components/tasks/AddTask";
import { TaskList } from "@/components/tasks/TaskList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Tasks</h1>
          <form action="/api/auth/signout" method="post">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <AddTaskWrapper />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Task List</h2>
          <TaskListWrapper />
        </div>
      </div>
    </div>
  );
}

// We need to use client components for AddTask and TaskList, so we wrap them
// These wrappers allow us to keep the page itself a server component
function AddTaskWrapper() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <AddTask onTaskAdded={() => {
        // This is a client component, so we'll handle the refresh
        // in the component itself
      }} />
    </div>
  );
}

function TaskListWrapper() {
  return <TaskList />;
}