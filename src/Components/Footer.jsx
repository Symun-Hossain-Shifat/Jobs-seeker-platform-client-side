'use client'

import React from 'react';
import logofooter from '@/asset/logo.png'
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

export default function Footerpage() {
  return (
    <footer className="bg-[#030303] text-[#a3a3a3] py-12 px-6 md:px-12 lg:px-24 border-t border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo and Brand Description Section */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
          <Image src={logofooter} alt="Footer Logo" width={200} height={130} />
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-[#3b82f6] font-medium text-sm tracking-wider uppercase">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Job discovery</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Worker AI</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Companies</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Salary data</a></li>
            </ul>
          </div>

          {/* Navigations Links */}
          <div className="space-y-4">
            <h3 className="text-[#3b82f6] font-medium text-sm tracking-wider uppercase">Navigations</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Help center</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Career library</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-[#3b82f6] font-medium text-sm tracking-wider uppercase">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Brand Guideline</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Newsroom</a></li>
            </ul>
          </div>

        </div>

        <hr className="border-zinc-900 my-6" />

        {/* Bottom Section (Socials and Copyrights) */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 pt-4">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center bg-zinc-900 rounded-lg text-white hover:bg-zinc-800 transition-colors">
              <FaFacebookF size={18} />
            </a>
            {/* Pinterest/Custom Icon placeholder stylized like the screenshot */}
            <a href="#" aria-label="Pinterest" className="w-9 h-9 flex items-center justify-center bg-[#6366f1] rounded-lg text-white hover:bg-[#4f46e5] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.17-.1-.95-.2-2.41.04-3.44.22-.93 1.4-5.93 1.4-5.93s-.36-.71-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.41 0-5.4 2.56-5.4 5.19 0 1.03.4 2.14.89 2.74.1.12.11.23.08.36-.09.38-.29 1.19-.33 1.35-.05.21-.18.26-.41.15-1.54-.72-2.51-2.97-2.51-4.78 0-3.89 2.83-7.47 8.16-7.47 4.29 0 7.62 3.05 7.62 7.14 0 4.26-2.68 7.69-6.41 7.69-1.25 0-2.43-.65-2.83-1.42l-.77 2.93c-.28 1.07-1.04 2.41-1.55 3.25C10.22 23.87 11.1 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center bg-zinc-900 rounded-lg text-white hover:bg-zinc-800 transition-colors">
              <FaLinkedin size={18} />
            </a>
          </div>

          {/* Legal / Copyright Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-zinc-500">
            <p>Copyright 2024 — Programming Hero</p>
            <div className="hidden sm:block text-zinc-700">|</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-zinc-300 transition-colors">Terms & Policy</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Guideline</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}