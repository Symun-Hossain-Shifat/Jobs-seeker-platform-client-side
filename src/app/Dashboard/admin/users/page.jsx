import { GetUsers } from "@/lib/Action/GetData/getUser";

export default async function Dashboarduserpage() {
  const users = await GetUsers();
  const result = users.filter(user => user.role !== 'Admin') 
  // console.log(result)
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Users Management
          </h1>
          <p className="text-gray-400 mt-2">
            Total Users: {users?.length || 0}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {result?.map((user) => (
            <div
              key={user._id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/20"
            >
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <img
                  src={
                    user.image ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
                />

                <h2 className="mt-4 text-xl font-bold text-white">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-400">{user.email}</p>
              </div>

              {/* Details */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Role</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      user.role === "Admin"
                        ? "bg-red-500"
                        : user.role === "Recruiter"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-white">
                    {user.Plans || "Free"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>

                  {user.isBlocked ? (
                    <span className="rounded-full bg-red-500 px-3 py-1 text-white">
                      Blocked
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-500 px-3 py-1 text-white">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">User ID</span>

                  <span className="text-xs text-gray-500">
                    {user._id.slice(-8)}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
                  user.isBlocked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {user.isBlocked ? "✅ Unblock User" : "🚫 Block User"}
              </button>
            </div>
          ))}

          {users?.length === 0 && (
            <div className="col-span-full rounded-xl border border-zinc-700 p-10 text-center text-gray-400">
              No Users Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}