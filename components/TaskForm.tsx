import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";

interface TaskFormProps {
  onSubmit: (taskData: any) => void;
  initialData?: any;
}

const TaskForm = ({ onSubmit, initialData }: TaskFormProps) => {
  const [task, setTask] = useState(
    initialData || { name: "", description: "" }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(localStorage.getItem('token'));

    try {
      const response = await axiosInstance.post("/todo", task); // Replace with your actual API endpoint
      // onSubmit(response.data); // Pass the new task data to parent component
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md shadow-md"
    >
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        placeholder="Task Name"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        placeholder="Task Description"
        required
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
      >
        <option value="Not Started">Not Started</option>
        <option value="On Progress">On Progress</option>
        <option value="Done">Done</option>
        <option value="Reject">Reject</option>
      </select>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
