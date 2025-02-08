import React from 'react';
import Link from 'next/link';
import "@/styles/globals.css";

const Header = () => {
  return (
    <header className="p-4 bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo Management</h1>
        <nav className="space-x-6">
          <Link href="/dashboard" className="hover:text-gray-300 transition duration-200 ease-in-out text-lg">
            Dashboard
          </Link>
          <Link href="/auth/login" className="hover:text-gray-300 transition duration-200 ease-in-out text-lg">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
