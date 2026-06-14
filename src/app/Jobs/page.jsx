import { GetAllJob } from '@/lib/Action/GetData/Getjob'
import React from 'react'
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

async function BrowsJobsPage() {
  const Datas = await GetAllJob();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatSalary = (num) => Number(num).toLocaleString();

  const gradients = [
    "from-blue-500/10 to-transparent",
    "from-purple-500/10 to-transparent",
    "from-emerald-500/10 to-transparent",
    "from-rose-500/10 to-transparent",
    "from-amber-500/10 to-transparent",
    "from-cyan-500/10 to-transparent",
  ];

  const avatarColors = [
    "bg-blue-950 text-blue-300",
    "bg-purple-950 text-purple-300",
    "bg-emerald-950 text-emerald-300",
    "bg-rose-950 text-rose-300",
    "bg-amber-950 text-amber-300",
    "bg-cyan-950 text-cyan-300",
  ];

  return (
    <div className='p-5'>
      <h1 className='font-bold text-3xl'>All Available Jobs</h1>
      <Link href={'/'}><p className='text-blue-700 font-semibold'>Back Home</p></Link>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
        {Datas.map((job, index) => {
          // ✅ map এর ভেতরে define করো — job আর index এখানে available
          const initials = job.companyName
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const accentGradient = gradients[index % gradients.length];
          const avatarColor = avatarColors[index % avatarColors.length];

          return (
            <div
              key={job._id}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-600 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${avatarColor} flex items-center justify-center flex-shrink-0 font-semibold text-sm`}>
                      {initials}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-zinc-100 leading-snug">
                        {job.title}
                      </p>
                      <p className="text-[12px] text-zinc-500 mt-0.5">
                        {job.companyName}
                      </p>
                    </div>
                  </div>

                  <span className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    job.status === "active"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-[11px] px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 capitalize">
                    {job.type}
                  </span>
                  {job.isRemote && (
                    <span className="text-[11px] px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      🌐 Remote
                    </span>
                  )}
                  <span className="text-[11px] px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                    {job.category}
                  </span>
                </div>

                {/* Salary */}
                <div className="bg-zinc-800/40 border border-zinc-700/40 rounded-xl px-4 py-3 mb-5">
                  <p className="text-[11px] text-zinc-600 uppercase tracking-wider mb-1">
                    Salary Range
                  </p>
                  <p className="text-[18px] font-bold text-zinc-100">
                    ${formatSalary(job.salaryMin)}{" "}
                    <span className="text-zinc-600 font-normal">—</span>{" "}
                    ${formatSalary(job.salaryMax)}
                    <span className="text-[12px] font-normal text-zinc-500 ml-1">
                      {job.currency} / yr
                    </span>
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mb-5 text-[11px] text-zinc-600">
                  <span>📅 {formatDate(job.deadline)}</span>
                  <span>🕐 {formatDate(job.postedAt)}</span>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-4 border-t border-zinc-800">
                  <Link href={`/Jobs/${job._id}`}>
                    <button className="group/btn w-full flex items-center justify-center gap-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-700/80 border border-zinc-700 hover:border-zinc-500 rounded-xl py-2.5 transition-all duration-200">
                      View Details
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrowsJobsPage;