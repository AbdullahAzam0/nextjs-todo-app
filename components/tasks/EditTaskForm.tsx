// components/tasks/EditTaskForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface EditTaskFormProps {
  id: string;
  initialContent: string;
}

export function EditTaskForm({ id, initialContent }: EditTaskFormProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError("Task cannot be empty");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      
      // Navigate back to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to update task");
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="task" className="text-sm font-medium">
              Task
            </label>
            <Input
              id="task"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your task"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}