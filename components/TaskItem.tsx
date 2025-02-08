import { Task } from "@/models/taskModel";
import { useRouter } from "next/router";
import React from "react";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const statusColors = {
    not_started: "bg-gray-200 text-gray-800",
    on_progress: "bg-yellow-200 text-yellow-800",
    done: "bg-green-200 text-green-800",
    reject: "bg-red-200 text-red-800",
  };

  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/tasks/${task.id}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Name:</span>
        <span className="ml-2 text-gray-900">{task.name}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Description:</span>
        <span className="ml-2 text-gray-900">{task.description}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-700">Status:</span>
        <span
          className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
            statusColors[task.status] || "bg-gray-200 text-gray-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleViewDetails}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
