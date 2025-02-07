import React from 'react';
import Link from 'next/link';


const Header = () => {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Todo Management</h1>
      <nav>
        <Link href="/dashboard" className="mr-4">Dashboard</Link>
        <Link href="/auth/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
