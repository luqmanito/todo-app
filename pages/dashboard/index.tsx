import { useEffect } from "react";
import { useRouter } from "next/router";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mix-blend-plus-darker text-black">
        Dashboard
      </h2>
      <TaskForm />
      <TaskList />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
