import { GetAppliedJobbyEmail } from "@/lib/Action/GetData/Getjob";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

async function JobsTable() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const Datas = (await GetAppliedJobbyEmail(email)) || [];

  return (
    <div className="px-4 py-4 sm:px-6">
      <h1 className="font-bold text-2xl py-4">
        Manage Applied Jobs
      </h1>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-white text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Job Title</th>
              <th className="p-3 text-left">Resume</th>
              <th className="p-3 text-left">Apply Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Datas.map((job, index) => (
              <tr
                key={job._id?.toString() || index}
                className="border-t border-gray-700 hover:bg-gray-800/50"
              >
                <td className="p-3 font-medium">
                  {job.position}
                </td>

                <td className="p-3">
                    <Link className="font-semibold text-blue-600" href= {job.resumeUrl || "N/A"}>
                    See Now
                    </Link>
                 
                </td>

                <td className="p-3">
                  {job.appliedAt
                    ? new Date(job.appliedAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-3">
                  <StatusBadge
                    status={job.status || "pending"}
                  />
                </td>

                <td className="p-3">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {Datas.map((job, index) => (
          <div
            key={job._id?.toString() || index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold">
                {job.title}
              </h2>

              <StatusBadge
                status={job.status || "pending"}
              />
            </div>

            <div className="mt-3 text-sm text-gray-300">
              <p>
                <span className="text-gray-500">
                  Type:
                </span>{" "}
                {job.type || "N/A"}
              </p>

              <p>
                <span className="text-gray-500">
                  Applied:
                </span>{" "}
                {job.createdAt
                  ? new Date(
                      job.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="mt-4 border-t border-gray-700 pt-3">
              <ActionButtons />
            </div>
          </div>
        ))}
      </div>

      {Datas.length === 0 && (
        <div className="text-center text-gray-500 py-16">
          No applied jobs found.
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    applied:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    pending:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    shortlisted:
      "bg-green-500/15 text-green-400 border border-green-500/30",
    rejected:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full capitalize ${
        styles[status?.toLowerCase()] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}

function ActionButtons() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700">
        View
      </button>
    </div>
  );
}

export default JobsTable;