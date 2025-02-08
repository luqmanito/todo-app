import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { ErrorResponse } from "@/models/errModel";

interface Task {
  name: string;
  description: string;
}

const TaskForm = () => {
  const [task, setTask] = useState<Task>({ name: "", description: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/todo", task);
      toast.success("Task created successfully!");
      setTask({ name: "", description: "" });
    } catch (error: unknown) {
      if ((error as ErrorResponse).response) {
        toast.error((error as ErrorResponse).response?.data.errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-lg shadow-lg bg-white max-w-md mx-auto"
    >
      <div className="space-y-2">
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
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all 
                     text-gray-900"
          placeholder="Enter task name"
          required
        />
      </div>

      <div className="space-y-2">
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
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none 
                     h-32 transition-all text-gray-900"
          placeholder="Describe the task details"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                   rounded-md shadow-sm transition-colors duration-200 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
