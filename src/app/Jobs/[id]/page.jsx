import { GetSpecificJob } from "@/lib/Action/GetData/Getjob";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

// JobDetailPage.jsx
export default async function JobDetailPage({ params }) {
  const {id} = await params 
  const job = await GetSpecificJob(id)
  const {
    _id, title, category, type, salaryMin, salaryMax, currency,
    isRemote, city, country, deadline, responsibilities,
    requirements, benefits, status, companyId, postedAt, visibility,
  } = job;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

    const session = await auth.api.getSession({
        headers: await headers(),
      });
      const User = session?.user;
      console.log(User)
    

  const skills = ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge color="green" icon="✅">{status}</Badge>
              <Badge color="blue" icon="💼">{type}</Badge>
              {isRemote && <Badge color="teal" icon="🌐">Remote</Badge>}
              <Badge color="amber" icon="💻">{category}</Badge>
            </div>
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-white">{title}</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Posted {formatDate(postedAt)} · Deadline: {formatDate(deadline)}
            </p>
          </div>
          
            <Link href={ User ? `/Jobs/${id}/apply` : `/signin`}
            className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-80 transition"
          >
            ✉ Apply Now
          </Link>
        </div>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />

        {/* Info Grid */}
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Overview</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {[
                    { 
            label: "Min Salary", 
            value: `${currency} ${(salaryMin ?? 0).toLocaleString()}` 
          },
          { 
            label: "Max Salary", 
            value: `${currency} ${(salaryMax ?? 0).toLocaleString()}` 
          },
            { label: "Location", value: isRemote ? "Remote" : `${city}, ${country}` },
            { label: "Visibility", value: visibility },
            { label: "Deadline", value: formatDate(deadline) },
           { label: "Job ID", value: _id?.slice(0, 8) ?? "N/A" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-4 py-3">
              <p className="text-xs text-zinc-400 mb-1">{label}</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />

        {/* Responsibilities */}
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Responsibilities</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed mb-5">
          {responsibilities}
        </p>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Requirements</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed mb-5">
          {requirements}
        </p>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />


        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Benefits</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed mb-5">
          {benefits}
        </p>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />

        {/* Skills */}
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Skills</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {skills.map((s) => (
            <span key={s} className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {s}
            </span>
          ))}
        </div>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />

        {/* Benefits */}
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Why Join</p>
        <ul className="space-y-2 mb-5">
          {[
            "Work on real client projects from Day 1",
            "Learn to build high-speed, SEO-optimized websites",
            "Grow in a creative, tech-driven environment",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="mt-0.5">🚀</span> {item}
            </li>
          ))}
        </ul>

        <hr className="border-zinc-100 dark:border-zinc-800 my-4" />

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <p className="text-xs text-zinc-400">Company ID: <code className="font-mono">{companyId}</code></p>
          
            <a href="mailto:careercodlinker2024@gmail.com"
            className="flex items-center gap-2 text-xs font-medium bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
          >
            ✉ careercodlinker2024@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, color, icon }) {
  const colors = {
    green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    teal: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${colors[color]}`}>
      {icon} {children}
    </span>
  );
}