

import React from "react";
import { Bookmark, Send, Calendar, Medal } from "lucide-react";
import { Avatar, Button, Card, ProgressBar } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";


export default async function JobDashboard() {

  
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    const User = session?.user;
  

  const stats = [
    {
      title: "Saved Jobs",
      value: 12,
      icon: Bookmark,
      color: "text-gray-400",
    },
    {
      title: "Applications Submitted",
      value: 24,
      icon: Send,
      color: "text-gray-400",
    },
    {
      title: "Interviews Scheduled",
      value: 3,
      icon: Calendar,
      color: "text-amber-500",
    },
    {
      title: "Offers Received",
      value: 1,
      icon: Medal,
      color: "text-green-500",
    },
  ];

  const applicationStatuses = [
    { label: "Applied", count: 10, total: 24, color: "default" },
    { label: "Under Review", count: 6, total: 24, color: "warning" },
    { label: "Shortlisted", count: 5, total: 24, color: "primary" },
    { label: "Rejected", count: 2, total: 24, color: "danger" },
    { label: "Offered", count: 1, total: 24, color: "success" },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Card
                key={index}
                className="bg-[#1c1c1e] text-white border-none shadow-none"
              >
                <div className="p-5 h-32 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-400">
                      {stat.title}
                    </span>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>

                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Profile + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="bg-[#1c1c1e] text-white border-none shadow-none">
            <div className="p-6 flex flex-col h-full min-h-[300px]">
              <div className="flex items-center gap-4">
                <Image
                  src = {User?.image}
                  alt="User Image"
                  className="bg-[#2c2c2e] rounded-full text-white"
                  height={90}
                  width={90}
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {User?.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {User?.email}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Button
                  variant="bordered"
                  className="w-full border-[#2c2c2e] text-white"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Application Status */}
          <Card className="bg-[#1c1c1e] text-white border-none shadow-none">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-5">
                Application Status
              </h3>

              <div className="space-y-5">
                {applicationStatuses.map((status, index) => {
                  const percentage =
                    (status.count / status.total) * 100;

                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-400">
                          {status.label}
                        </span>
                        <span>{status.count}</span>
                      </div>

                      <ProgressBar
                        aria-label={status.label}
                        value={percentage}
                        color={status.color}
                        size="sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}