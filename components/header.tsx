import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
      <div className="text-2xl font-bold tracking-tight">
        <Link href="/"><span style={{ color: '#a67c52', opacity: 0.6 }}>sutharsika kumar</span></Link>
      </div>
      <nav className="space-x-6 text-sm font-medium">
        <Link href="/home" className="hover:text-blue-600 transition">home</Link>
        <Link href="/projects" className="hover:text-blue-600 transition">projects</Link>
        <Link href="/art" className="hover:text-blue-600 transition">art</Link>
        <Link href="/dance" className="hover:text-blue-600 transition">dance</Link>
      </nav>
    </header>
  );
};

export default Header;
