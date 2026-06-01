"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '@/asset/logo.png'
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-4  sm:px-6 lg:px-5 py-4 bg-gray-950 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center  justify-between">

        {/* Left Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 ">
          <Image 
          src={logo} 
          alt="Logo Image"
          width={100}
          height={100}
          
          />
        </div>

        {/* Right Side Content */}
        <div className="hidden md:flex items-center ml-auto  bg-[#252525] rounded-2xl px-3 py-3 ">

          {/* Menu */}
          <ul className="flex items-center gap-8 text-sm text-gray-300">
            <li>
              <Link
                href="/jobs"
                className="hover:text-white transition"
              >
                Browse Jobs
              </Link>
            </li>

            <li>
              <Link
                href="/company"
                className="hover:text-white transition"
              >
                Company
              </Link>
            </li>

            <li>
              <Link
                href="/pricing"
                className="hover:text-white transition"
              >
                Pricing
              </Link>
            </li>
          </ul>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-600 mx-6"></div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-5">
            <Link
              href="/signin"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign In
            </Link>

            <button className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:scale-105 transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 rounded-xl p-5 border border-gray-700">
          <ul className="flex flex-col gap-4 text-gray-300">
            <li>
              <Link href="/jobs">Browse Jobs</Link>
            </li>

            <li>
              <Link href="/company">Company</Link>
            </li>

            <li>
              <Link href="/pricing">Pricing</Link>
            </li>

            <hr className="border-gray-600" />

            <li>
              <Link
                href="/signin"
                className="text-purple-400"
              >
                Sign In
              </Link>
            </li>

            <button className="bg-white text-black py-2 rounded-xl font-medium">
              Get Started
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}