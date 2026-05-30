"use client";

import { Search, MapPin, Sparkles } from "lucide-react";



export default function Bannerpage() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4">

  


      {/* HERO CONTENT */}
      <div className="relative z-10 text-center max-w-5xl w-full pt-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-700 bg-[#111111]/80 backdrop-blur-md mb-8">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
            <Sparkles size={12} />
          </div>

          <span className="text-white text-sm font-semibold">
            56,000+
          </span>

          <span className="text-gray-400 text-xs uppercase tracking-wider">
            New Jobs This Month
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mt-5 text-sm md:text-base leading-7">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your next role faster.
        </p>

        {/* Search Box */}
        <div className="mt-10 bg-[#111111]/80 backdrop-blur-md border border-gray-700 rounded-2xl p-3 max-w-4xl mx-auto">

          <div className="flex flex-col md:flex-row gap-3">

            <div className="flex items-center gap-3 flex-1 px-4 py-3 border border-gray-700 rounded-xl">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Job title, skill or company"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>

            <div className="flex items-center gap-3 flex-1 px-4 py-3 border border-gray-700 rounded-xl">
              <MapPin size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="bg-transparent outline-none text-white w-full"
              />
            </div>

            <button className="bg-purple-600 hover:bg-purple-700 rounded-xl px-6 py-3 transition">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Trending */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-gray-500 text-sm whitespace-nowrap">
            Trending Position:
          </span>

          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-5 py-2 rounded-full bg-[#161616] border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition">
              Product Designer
            </button>

            <button className="px-5 py-2 rounded-full bg-[#161616] border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition">
              UI Engineer
            </button>

            <button className="px-5 py-2 rounded-full bg-[#161616] border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition">
              DevOps Engineer
            </button>
          </div>
        </div>
      </div>



    </section>
  );
}