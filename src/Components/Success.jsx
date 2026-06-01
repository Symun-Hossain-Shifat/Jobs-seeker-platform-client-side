"use client";

import {
  Search,
  TrendingUp,
  Building2,
  Bookmark,
  Zap,
  FileText,
  Target,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: TrendingUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: Zap,
    title: "One-Click Apply",
    description: "Simplify your job applications for all visible providers.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Target,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: GraduationCap,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function JobFeaturesSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
     

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Features · Job
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-white font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-14">
          Everything you need
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            to succeed
          </span>
        </h2>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex items-start gap-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-300 cursor-default"
            >
              {/* Icon box */}
              <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/15 group-hover:bg-indigo-500/25 border border-indigo-500/20 flex items-center justify-center transition-colors duration-300">
                <Icon
                  size={18}
                  className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-white text-sm font-semibold mb-1 leading-snug">
                  {title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}