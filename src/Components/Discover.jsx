"use client";

import { MapPin, ArrowRight } from "lucide-react";

const jobs = Array(6).fill({
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
  location: "New York, USA",
  type: "Hybrid",
  salary: "$25-$40/hour",
});

export default function FeaturedJobs() {
  return (
    <section className="py-24 px-4 ">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-zinc-800 rounded-full px-4 py-1 text-xs tracking-[0.2em] text-zinc-400 uppercase mb-6">
            Smart Job Discovery
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
            The roles you'd never
            <br />
            find by searching
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-7 hover:border-zinc-700 transition-all"
            >
              <h3 className="text-white text-2xl font-semibold mb-4">
                {job.title}
              </h3>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                  <MapPin size={12} />
                  {job.location}
                </span>

                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                  {job.type}
                </span>
              </div>

              <div className="mb-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                  {job.salary}
                </span>
              </div>

              <button className="group inline-flex items-center gap-2 text-white text-sm font-medium">
                Apply Now
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-zinc-200 transition">
            View all job open
          </button>
        </div>
      </div>
    </section>
  );
}