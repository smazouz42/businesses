"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    rounter.push('/');
    console.log('Form submitted with:', { username, password });
  };
  const rounter = useRouter();
  return (
    <div className="bg-gray-800 flex flex-col justify-center h-screen">
      <form
        className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl dark:text-white font-bold text-center">
          SIGN IN
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
    
        <button
          className="w-full my-5 py-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/40 text-white font-semibold rounded-lg"
          type="submit"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}
