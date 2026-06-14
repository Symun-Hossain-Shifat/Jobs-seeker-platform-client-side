import { GetAllJob } from "@/lib/Action/GetData/Getjob";
import { ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default async function FeaturedJobs() {
  const Datas = await GetAllJob();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatSalary = (num) => Number(num).toLocaleString();

  return (
    <section className="py-28 px-4 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900/80 rounded-full px-5 py-1.5 text-xs tracking-[0.2em] text-zinc-400 uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Smart Job Discovery
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight tracking-tight">
            The roles you'd{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              never find
            </span>
            <br />
            by searching
          </h2>
          <p className="mt-4 text-zinc-500 text-base max-w-xl mx-auto">
            Handpicked opportunities matched to your skills — updated daily.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Datas?.slice(0, 6).map((job, index) => {
            const initials = job.companyName
              ?.split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

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

            const accentGradient = gradients[index % gradients.length];
            const avatarColor = avatarColors[index % avatarColors.length];

            return (
              <div
                key={job._id}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-zinc-600 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card top color accent */}
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

                    <span
                      className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        job.status === "active"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
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

        {/* Bottom Button */}
        <div className="flex justify-center mt-14">
          <Link href="/Jobs">
            <button className="group inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-xl font-semibold hover:bg-zinc-100 transition-all duration-200">
              View all open roles
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}