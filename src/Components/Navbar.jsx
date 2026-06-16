'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '@/asset/logo.png';
import Image from "next/image";
import { authClient } from "@/lib/auth-client";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const User = session?.user;
 

  
// Unified navigation links configuration
const navLinks = [
  { href: "/Jobs", label: "Browse Jobs" },
  { href: "/plans", label: "Plans" }
  
];
let Role = ''
if(User?.role === 'Recruiter'){
Role = 'recruiter'
}else if(User?.role === 'Job Seeker'){
  Role = 'seeker'
}else if(User?.role === 'admin'){
 Role = 'admin'
}
// console.log(User?.role)
if(User){
navLinks.push(
  {
    href: `/Dashboard/${Role}`, label: "Dashboard" 
  }
)
}
  // Render Auth element cleanly
  const renderAuthButton = () => (
    User ? (
      <button onClick={() => authClient.signOut()} className="text-purple-400 text-left">
        Logout
      </button>
    ) : (
      <Link href="/signin" className="text-purple-400">
        Sign In
      </Link>
    )
  );

  return (
    <header className="w-full px-4 sm:px-6 lg:px-5 py-4 bg-gray-950 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image src={logo} alt="Logo Image" width={100} height={100} />
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex items-center ml-auto bg-[#252525] rounded-2xl px-3 py-3">
          <ul className="flex items-center gap-8 text-sm text-gray-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-px h-6 bg-gray-600 mx-6"></div>

          <div className="flex items-center gap-5 text-sm">
            {renderAuthButton()}
            <button className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:scale-105 transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 rounded-xl p-5 border border-gray-700 bg-gray-950">
          <ul className="flex flex-col gap-4 text-gray-300">
            {navLinks.map((link) => (
              <li key={link.href} onClick={() => setOpen(false)}>
                <Link href={link.href} className="block w-full">{link.label}</Link>
              </li>
            ))}
            
            <hr className="border-gray-600" />
            
            <li onClick={() => setOpen(false)}>{renderAuthButton()}</li>
            
            <button className="bg-white text-black py-2 rounded-xl font-medium w-full">
              Get Started
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}