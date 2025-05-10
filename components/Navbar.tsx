// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Bounty', href: '/bounty' },
    { label: 'Wallet', href: '/wallet' },
    { label: 'Profile', href: '/user' },
  ];

  return (
    <nav className="w-full flex items-center justify-start z-50">
      <div className="text-cyan-400 text-2xl font-bold font-orbitron mr-8">Git Bounty</div>
      <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8 z-30">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="relative inline-block overflow-hidden px-5 py-2 border-2 border-gray-800 bg-[#101301] text-white text-base rounded-full transition-all font-bold font-orbitron hover:border-yellow-300 hover:bg-gray-700 hover:text-yellow-400"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
