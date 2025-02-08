import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import axiosInstance from "@/utils/axiosInstance";
import { ResponseData, Task } from "@/models/taskModel";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTasks = async (page: number, perPage: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<ResponseData>("/todo", {
        params: {
          page,
          per_page: perPage,
        },
      });

      setTasks(response.data.data);
      setTotalCount(response.data.metadata.total_count);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / perPage)) {
      setPage(newPage);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task List</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {page} of {Math.ceil(totalCount / perPage)}
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= Math.ceil(totalCount / perPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="perPage" className="mr-2 text-gray-700">
          Items per page:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="px-2 py-1 border border-gray-600 rounded text-black"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default TaskList;
