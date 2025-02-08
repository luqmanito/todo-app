import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { ErrorResponse } from "@/models/errModel";

interface Task {
  name: string;
  description: string;
  status: string;
  assigne_id: string | null;
}

interface User {
  id: string;
  email: string;
}

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<Task | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTask = async (taskId: string) => {
    try {
      const response = await axiosInstance.get(`/todo/${taskId}`);
      setTask(response.data.data);
    } catch (error) {
      console.error("Error fetching task:", error);
      setError("Failed to fetch task details.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/member");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: task?.name,
      description: task?.description,
      assigne_id: task?.assigne_id || null,
      status: task?.status,
    };

    try {
      await axiosInstance.patch(`/todo/${id}`, payload);
      toast.success("Task updated successfully!");
    } catch (error: unknown) {
      if ((error as ErrorResponse).response) {
        toast.error((error as ErrorResponse).response?.data.errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) =>
      prevTask ? { ...prevTask, [name]: value } : prevTask
    );
  };

  useEffect(() => {
    if (id) {
      fetchTask(id as string);
      fetchUsers();
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>Task not found.</p>;

  const isLead = localStorage.getItem("role") === "lead";

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-black">Task Details</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Task Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={task.name}
            onChange={handleChange}
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={task.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            required
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            value={task.status}
            onChange={handleChange}
            className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="not_started">Not Started</option>
            <option value="on_progress">On Progress</option>
            <option value="done">Done</option>
            <option value="reject">Reject</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="assigne_id"
            className="block text-sm font-medium text-gray-700"
          >
            Assigne
          </label>
          <select
            name="assigne_id"
            disabled={!isLead}
            id="assigne_id"
            value={task.assigne_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetail;
