import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center font-[Inter]">
      <div className="text-2xl font-bold tracking-tight">
        <Link href="/"><span style={{ color: '#3a829c', opacity: 0.6 }}>SK</span></Link>
      </div>
      <nav className="space-x-6 text-sm font-medium">
        <Link href="/home" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/projects" className="hover:text-blue-600 transition">Projects</Link>
        <Link href="/research" className="hover:text-blue-600 transition">Research</Link>
        <Link href="/art" className="hover:text-blue-600 transition">Art</Link>
      </nav>
    </header>
  );
};

export default Header;
