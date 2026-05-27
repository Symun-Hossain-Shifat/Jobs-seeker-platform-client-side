"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#1a1a1a] px-4 sm:px-6 lg:px-10 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-[#252525] rounded-2xl px-5 py-4 border border-gray-700">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">▶</span>
          </div>

          <div>
            <h2 className="text-white font-semibold text-sm sm:text-base">
              Programming
            </h2>
            <p className="text-white text-xs">Hero</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-[#252525] rounded-xl p-5 border border-gray-700">
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

            <li>
              <Link
                href="/signin"
                className="text-purple-400"
              >
                Sign In
              </Link>
            </li>

            <button className="bg-white text-black py-2 rounded-xl mt-2 font-medium">
              Get Started
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}