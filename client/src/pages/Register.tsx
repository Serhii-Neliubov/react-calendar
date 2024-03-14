import { Link } from 'react-router-dom';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import {useInput} from "../hooks/useInput";

export const Register = () => {
  const password = useInput('');
  const confirmPassword = useInput('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (password.value !== confirmPassword.value) {
        return toast.error('Passwords do not match');
      }

      const formData = new FormData(e.currentTarget);

      const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      };

      console.log(data);
    } catch (error){
      console.log(error);
    }
  }
  return (
    <div className="overflow-hidden flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Sign up</h1>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input required={true} placeholder='John Doe' type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
          </div>
          <div className="mb-4">
            <label htmlFor="v" className="block text-gray-600">Email</label>
            <input required={true} placeholder='your_email@gmail.com' type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input value={password.value} onChange={password.onChange} required={true} placeholder='Write the password here...' type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">Confirm Password</label>
            <input value={confirmPassword.value} onChange={confirmPassword.onChange} required={true} placeholder='Confirm the password' type="password" id="confirmPassword" name="confirmPassword" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link to="/login" className="hover:underline">Login Here</Link>
        </div>
      </div>
    </div>
  );
}