// components/tasks/AddTask.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddTaskProps {
  onTaskAdded: () => void;
}

export function AddTask({ onTaskAdded }: AddTaskProps) {
  const [taskContent, setTaskContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskContent.trim()) {
      setError("Task cannot be empty");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: taskContent }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      
      setTaskContent("");
      onTaskAdded(); // Callback to refresh task list
    } catch (error: any) {
      setError(error.message || "Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}