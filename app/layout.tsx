import React from 'react';
import '../styles/globals.css';  // Import global styles (TailwindCSS)
import Header from '../components/Header';  // Default import

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100">
        <Header />  {/* Global Header for all pages */}
        <main className="container mx-auto p-4">
          {children}  {/* This will render the content of each page */}
        </main>
      </body>
    </html>
  );
}
