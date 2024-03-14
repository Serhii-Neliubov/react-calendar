import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import $api from "../assets/http/interceptors.ts";

export const Login = ({setIsAuth}: {setIsAuth: (value: boolean) => void}) => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const username = formData.get('username');
      const password = formData.get('password');

      const accessToken = await $api.post('/login', {
        username: username as string,
        password: password as string
      });

      localStorage.setItem('token', accessToken.data.token);
      setIsAuth(true);
      toast.success('Logged in successfully');
      navigate('/');
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="overflow-hidden flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link to="/signup" className="hover:underline">Sign up Here</Link>
        </div>
      </div>
    </div>
  );
}