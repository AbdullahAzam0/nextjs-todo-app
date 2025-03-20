// components/tasks/TaskList.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Task {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export function TaskList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      setError("");
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update UI without page refresh
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error: any) {
      setError(error.message || "Failed to delete task");
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center text-gray-500">No tasks yet. Add your first task above!</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="bg-white">
          <CardContent className="p-4 flex justify-between items-center">
            <p className="text-gray-800">{task.content}</p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(task.id)}
                aria-label="Edit task"
              >
                <Edit className="h-4 w-4 text-blue-500" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(task.id)}
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}