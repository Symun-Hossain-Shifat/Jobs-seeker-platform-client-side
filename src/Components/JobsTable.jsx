

import { GetJob } from '@/lib/Action/Getjob';
import React from 'react'

async function JobsTable() {

  const companyId = 'company_123'
  const status = 'Active'
  const Datas = await GetJob(companyId,status);
  console.log(Datas)   
  return (
     <div className="">
      <h1 className='font-bold text-2xl py-4'>Manage All Jobs</h1>
      <table className="w-full border border-gray-700 text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-center">Candidate Position</th>
            <th>Type</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Visibility</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Datas.map((c, index) => (
            <tr key={index} className="border-t text-center border-gray-700">
              <td className="p-3">{c.title}</td>
              <td>{c.type}</td>
              <td>{c.deadline}</td>
              <td>{c.status}</td>
              <td>{c.visibility}</td>

              {/* Actions */}
              <td className="p-3 flex gap-2">
                <button className="px-2 py-1 bg-blue-500 rounded text-xs">
                  View
                </button>

                <button className="px-2 py-1 bg-yellow-500 rounded text-xs">
                  Edit
                </button>

                <button className="px-2 py-1 bg-red-500 rounded text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobsTable