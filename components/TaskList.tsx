import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import axiosInstance from "@/utils/axiosInstance";

interface TaskListProps {
  tasks: any[];
}
const TaskList: React.FC<TaskListProps> = ({}) => {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/todo");
      console.log(response.data.data);

      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
