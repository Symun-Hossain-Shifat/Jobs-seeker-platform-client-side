import { GetAllJob } from '@/lib/Action/GetData/Getjob'
import React from 'react'
import { MapPin, ArrowRight } from "lucide-react";
async function BrowsJobsPage () {
    const Datas = await GetAllJob();
    console.log(Datas)
  return (
    <div className='p-5'>
        <h1 className='font-bold text-3xl '>All Available Jobs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-5" >
            {Datas.map( job => (
                <div
              key={job._id}
              className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-7 hover:border-zinc-700 transition-all"
            >
              <h3 className="text-white text-2xl font-semibold mb-4">
                {job.title}
              </h3>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {job.category}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                  {job.country ? <MapPin size={12} /> : ''}
                  {job.country ? job.country : 'Remote'}
                </span>

                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                  {job.type}
                </span>
              </div>

              <div className="mb-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300">
                  ${job.salaryMin}-${job.salaryMax}
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
    </div>
  )
}

export default BrowsJobsPage 