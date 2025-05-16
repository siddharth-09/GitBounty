'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.svg';

const Navbar = () => {
  return (
    <div className='w-full h-[70px] flex justify-center items-center fixed mt-[2.4rem] all-unset'>
    <div className="w-95/100 top-0 left-0 z-50 fixed h-[70px] px-8 flex items-center justify-between rounded-[25px] border border-[rgba(255,255,255,0.2)] backdrop-blur-[20px] bg-[rgba(255,255,255,0.05)] m-8 " >
      
      {/* Left side: Logo + Nav Links */}
      <div className="flex items-center justify-center gap-12">
        {/* Logo */}
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
            />
        </Link>

        {/* Navigation Links */}
        
      </div>
      <div className='flex items-center justify-center gap-45'>
        <Link href="/">
          <div className="text-[24px] font-light bg-gradient-to-r from-[#14f195] to-[#999] bg-clip-text text-transparent cursor-pointer">
            Home
          </div>
        </Link>

        <Link href="/bounty">
          <div className="text-[24px] font-light bg-gradient-to-r from-[#14f195] to-[#999] bg-clip-text text-transparent cursor-pointer">
            Bounties
          </div>
        </Link>

        <Link href="/about">
          <div className="text-[24px] font-light bg-gradient-to-r from-[#14f195] to-[#999] bg-clip-text text-transparent cursor-pointer">
            About
          </div>
        </Link>
      </div>

      {/* Profile Button */}
      <Link href='/user'>
      
      <button className="relative capitalize font-light text-[20px] text-[#d9d9d9] h-[40px] px-5 rounded-[10px] border border-[rgba(255,255,255,0.2)] shadow-[0px_20px_20px_-10px_rgba(169,99,215,0.4)] bg-gradient-to-b from-[#262626] to-[#030a02] flex items-center justify-center [text-shadow:0px_-2px_2px_rgba(255,255,255,0.1),0px_2px_42px_rgba(0,0,0,0.25),0px_8px_40px_#a963d7] cursor-pointer">
        Profile
      </button>
      </Link>
    </div>
            </div>
  );
};

export default Navbar;
