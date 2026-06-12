

import JobApplicationForm from "@/Components/ApplyForm";
import { GetAppliedJob, GetSpecificJob } from "@/lib/Action/GetData/Getjob";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

const PLAN_LIMITS = {
  seeker_free: 3,
  reqruiter_free: 3,

  seeker_pro: 13,
  reqruiter_growth: 13,

  seeker_premium: 50,
  reqruiter_enterprise: 50,
};

function UpgradeCard({ limit }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

          <div className="relative p-8 md:p-10">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-5xl shadow-lg">
                🚀
              </div>
            </div>

            {/* Title */}
            <div className="text-center mt-6">
              <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                Plan Limit Reached
              </span>

              <h1 className="text-4xl font-bold mt-4">
                Upgrade Your Plan
              </h1>

              <p className="text-zinc-400 mt-3 leading-relaxed">
                You have reached your plan limit of{" "}
                <span className="text-white font-semibold">
                  {limit} applications
                </span>
                .
                <br />
                Upgrade your account to continue applying for jobs.
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-xl font-semibold mb-4">
                Premium Benefits
              </h3>

              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Unlimited Job Applications</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Featured Candidate Profile</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Priority Application Review</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Premium Job Alerts</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Resume Visibility Boost</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <span>Early Access to New Jobs</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/plans" className="flex-1">
                <Button
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                >
                  Upgrade Now 🚀
                </Button>
              </Link>

              <Link href="/Jobs" className="flex-1">
                <Button
                  variant="bordered"
                  size="lg"
                  className="w-full"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>

            <p className="text-center text-zinc-500 text-sm mt-6">
              Unlock more opportunities with a higher plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params }) {
  const { id } = await params;

  const [job, session] = await Promise.all([
    GetSpecificJob(id),
    auth.api.getSession({
      headers: await headers(),
    }),
  ]);

  const user = session?.user;

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">
            Please login first
          </h1>

          <Link href="/login">
            <Button color="primary">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const userId = user?.id;
  const plan = user?.Plans;

  const result = await GetAppliedJob(userId);

  const appliedCount = Array.isArray(result)
    ? result.length
    : 0;

  const currentLimit = PLAN_LIMITS[plan] ?? 0;

  const canApply =
    currentLimit > 0 && appliedCount < currentLimit;

  return (
    <div className="min-h-screen bg-black text-white">
      {canApply ? (
        <div className="p-10">
          <Link
            href={`/Jobs/${id}`}
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-6"
          >
            ← Back to Job
          </Link>

          <h1 className="text-3xl font-bold mb-8">
            Apply for {job?.title}
          </h1>

          <JobApplicationForm
            Job={job}
            Userinfo={user}
          />
        </div>
      ) : (
        <UpgradeCard limit={currentLimit} />
      )}
    </div>
  );
}