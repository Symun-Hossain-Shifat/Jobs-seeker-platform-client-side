import { GetJob } from '@/lib/Action/GetData/Getjob';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react'

async function JobsTable() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const User = session?.user?.id;

  const companyId = User ;
  const status = "active";
  const Datas = await GetJob(companyId, status);
  console.log(companyId, status)
  return (
    <div className="px-4 py-4 sm:px-6">
      <h1 className="font-bold text-2xl py-4">Manage All Jobs</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-white text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Visibility</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Datas.map((c, index) => (
              <tr
                key={index}
                className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-3 font-medium">{c.title}</td>
                <td className="p-3 capitalize">{c.type}</td>
                <td className="p-3">{c.deadline}</td>
                <td className="p-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="p-3">
                  <VisibilityBadge visibility={c.visibility} />
                </td>
                <td className="p-3">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="flex flex-col gap-4 md:hidden">
        {Datas.map((c, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-white text-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-base">{c.title}</h2>
              <StatusBadge status={c.status} />
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300 mb-4">
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Type</p>
                <p className="capitalize">{c.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Deadline</p>
                <p>{c.deadline}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Visibility</p>
                <VisibilityBadge visibility={c.visibility} />
              </div>
            </div>

            <div className="flex gap-2 border-t border-gray-700 pt-3">
              <ActionButtons />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {Datas.length === 0 && (
        <div className="text-center text-gray-500 py-16 text-sm">
          No active jobs found.
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-500/15 text-green-400 border border-green-500/30",
    inactive: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
    closed: "bg-red-500/15 text-red-400 border border-red-500/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${styles[status] ?? styles.inactive}`}>
      {status}
    </span>
  );
}

function VisibilityBadge({ visibility }) {
  const styles = {
    public: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    private: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${styles[visibility] ?? styles.public}`}>
      {visibility}
    </span>
  );
}

function ActionButtons() {
  return (
    <div className='flex gap-3'>
      <button className="flex-1 md:flex-none px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-medium transition-colors">
        View
      </button>
      <button className="flex-1 md:flex-none px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-xs font-medium transition-colors">
        Edit
      </button>
      <button className="flex-1 md:flex-none px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium transition-colors">
        Delete
      </button>
    </div>
  );
}

export default JobsTable;