import React from 'react'

import { Briefcase, Building2, Users, Star } from "lucide-react";
import globe from '@/asset/globe.png'
const stats = [
  {
    icon: <Briefcase size={18} />,
    number: "50K",
    label: "Active Jobs",
  },
  {
    icon: <Building2 size={18} />,
    number: "12K",
    label: "Companies",
  },
  {
    icon: <Users size={18} />,
    number: "2M",
    label: "Job Seekers",
  },
  {
    icon: <Star size={18} />,
    number: "97%",
    label: "Satisfaction Rate",
  },
];


function  Subheaderpage () {
  return (
    <div>    
    {/* STATS SECTION */}
      <div className="relative z-10 my-16 max-w-7xl mx-auto pt-20 mt-24 w-full"  >

      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${globe.src})`,
        }}
      />

        <div className="text-center ">
          <h2 className="text-2xl font-semibold text-white">
            Assisting over 15,000 job seekers <br /> find their dream positions.
          </h2>
         
        </div>

     <div className="grid grid-cols-2 pt-20 lg:grid-cols-4 gap-6">
  {stats.map((item, index) => (
    <div
      key={index}
      className="bg-gradient-to-t from-black via-zinc-900 to-zinc-800 rounded-2xl p-6 mt-5 border border-zinc-800"
    >
      <div className="text-gray-300 mb-6">
        {item.icon}
      </div>

      <h3 className="text-4xl font-bold text-white mb-2">
        {item.number}
      </h3>

      <p className="text-sm text-gray-400">
        {item.label}
      </p>
    </div>
  ))}
</div>
      </div></div>
  )
}

export default  Subheaderpage 