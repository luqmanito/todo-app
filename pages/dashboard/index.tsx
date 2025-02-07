import { useState, useEffect } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import axiosInstance from '@/utils/axiosInstance';

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  // Fetch tasks from API using Axios
  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/todo');  // Change this to your actual endpoint
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Call fetchTasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle task submission to the server and update the state
  const handleTaskSubmit = async (taskData: any) => {
    try {
      const response = await axiosInstance.post('/todo', taskData);  // Change to your actual API endpoint
      setTasks((prev) => [...prev, response.data]);  // Update the tasks list with the new task
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      
      {/* Task Form for adding new tasks */}
      <TaskForm onSubmit={handleTaskSubmit} />
      
      {/* Task List to display tasks */}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
