import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { GetAllJob } from "@/lib/Action/GetData/Getjob";

export default async function JobsTable() {
  const jobs = await GetAllJob();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Job Management</h1>
        <p className="text-default-500">
          Total Jobs: {jobs?.length || 0}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="p-4 text-left">Job</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Salary</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Deadline</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs?.map((job) => (
              <tr key={job._id} className="border-t hover:bg-default-50">
                <td className="p-4">
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-xs text-default-500">
                      #{job._id.slice(-6)}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  {job.companyName || job.Companyname}
                </td>

                <td className="p-4">{job.category}</td>

                <td className="p-4">
                  {job.city}, {job.country}
                </td>

                <td className="p-4">
                  {job.salaryMin} - {job.salaryMax} {job.currency}
                </td>

                <td className="p-4">
                  <Chip color="primary" variant="flat" size="lg">
                    {job.type}
                  </Chip>
                </td>

                <td className="p-4">
                  <Chip
                    color={job.status === "active" ? "success" : "danger"}
                    variant="flat"
                    size="lg"
                  >
                    {job.status}
                  </Chip>
                </td>

                <td className="p-4">{job.deadline}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {/* View */}
                    <Link href={`/Jobs/${job._id}`}>
                      <Button
                        isIconOnly
                        color="primary"
                        variant="flat"
                        size="sm"
                      >
                        <Eye size={16} />
                      </Button>
                    </Link>

                    {/* Edit */}
                    <Link href={`/Dashboard/admin/jobs/edit/${job._id}`}>
                      <Button
                        isIconOnly
                        color="warning"
                        variant="flat"
                        size="sm"
                      >
                        <Pencil size={16} />
                      </Button>
                    </Link>

                    {/* Delete */}
                    <Button
                      isIconOnly
                      color="danger"
                      variant="flat"
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {jobs?.length === 0 && (
              <tr>
                <td colSpan={9} className="p-10 text-center">
                  No Jobs Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}