import { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { ErrorResponse } from "@/models/errModel";

interface LoginResponse {
  data: {
    access_token: string;
    role: string;
  };
}

interface RegisterResponse {
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"lead" | "team">("team");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      toast.success("Login successful!");
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("role", response.data.data.role);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      if ((err as ErrorResponse).response) {
        toast.error((err as ErrorResponse).response?.data.errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = role === "lead" ? "/auth/admin" : "/auth/team";
      await axiosInstance.post<RegisterResponse>(endpoint, {
        email,
        password,
      });

      toast.success("User registered successfully!");
      setIsRegistering(false);
    } catch (err: unknown) {
      if ((err as ErrorResponse).response) {
        toast.error((err as ErrorResponse).response?.data.errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      {isRegistering ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <p className="text-black">email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 text-black border rounded-md"
            required
          />
          <p className="text-black">password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 text-black border rounded-md"
            required
          />
          <div>
            <label className="block text-black text-sm">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "lead" | "team")}
              className="w-full text-black p-2 border rounded-md"
            >
              <option value="team">Team</option>
              <option value="lead">Lead</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          >
            Register
          </button>
          <p className="text-sm text-black text-center mt-2">
            Already have an account?{" "}
            <span
              onClick={() => setIsRegistering(false)}
              className="text-blue-500 cursor-pointer"
            >
              Login here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <p className="text-black">email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full text-black p-2 border rounded-md"
            required
          />
          <p className="text-black">password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 text-black  border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          >
            Login
          </button>

          <p className="text-sm text-black text-center mt-2">
            {`Don't have an account? `}
            <span
              onClick={() => setIsRegistering(true)}
              className="text-blue-500 cursor-pointer"
            >
              Register here
            </span>
          </p>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
