import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const router = useRouter();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // You'd replace this with an actual authentication call
  //   // try {
  //   //     const response = await axios.post('localhost:3239/api/v1/auth/login', { email, password })
  //   //     localStorage.setItem('token', response.data.token)  // Store the JWT
  //   //     router.push('/')  // Redirect to home page or dashboard
  //   //   } catch (err) {
  //   //     setError('Invalid credentials')
  //   //   }
  //   if (email === 'admin@example.com' && password === 'password') {
  //     localStorage.setItem('authToken', 'jwt-token');
  //     router.push('/dashboard');
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    console.log('hit', email, password);
    
    // e.preventDefault()
    try {
      // const response = await axios.post('localhost:3239/api/v1/auth/login', { email, password })
      const response = await axiosInstance.post('/auth/login', { email, password })
      console.log(response.data.data.access_token);
      
      localStorage.setItem('token', response.data.data.access_token)  // Store the JWT
      // router.push('/dashboard')  // Redirect to home page or dashboard
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
