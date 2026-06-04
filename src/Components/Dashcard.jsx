import {
  BriefcaseBusiness,
  Users,
  Zap,
  CircleDashed,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Job Posts",
    value: "48",
    icon: BriefcaseBusiness,
  },
  {
    id: 2,
    title: "Total Applicants",
    value: "1,284",
    icon: Users,
  },
  {
    id: 3,
    title: "Active Jobs",
    value: "18",
    icon: Zap,
  },
  {
    id: 4,
    title: "Jobs Closed",
    value: "32",
    icon: CircleDashed,
  },
];

export default function CardSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="bg-black border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1F2937] flex items-center justify-center mb-6">
                <Icon size={18} className="text-gray-300" />
              </div>

              <p className="text-gray-400 text-sm mb-2">
                {item.title}
              </p>

              <h3 className="text-white text-3xl font-bold">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}