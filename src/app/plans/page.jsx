import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";

async function Planspage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userRole = session?.user?.role;

  const jobSeekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      featured: false,
      badge: null,
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile",
        "Email alerts",
      ],
      cta: "Get started",
    },
    {
      name: "Pro",
      price: "$19",
      period: "month",
      featured: true,
      badge: "Most popular",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
      cta: "Upgrade to Pro",
    },
    {
      name: "Premium",
      price: "$39",
      period: "month",
      featured: false,
      badge: null,
      features: [
        "Everything in Pro",
        "Unlimited applications",
        "Profile boost to recruiters",
        "Early access to new jobs",
        "Priority support",
      ],
      cta: "Go Premium",
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      featured: false,
      badge: null,
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
        "Great for a company's first year of hiring",
      ],
      cta: "Get started",
    },
    {
      name: "Growth",
      price: "$49",
      period: "month",
      featured: true,
      badge: "Most popular",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking",
        "Basic analytics",
        "Email support",
      ],
      cta: "Upgrade to Growth",
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "month",
      featured: false,
      badge: null,
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings",
        "Team collaboration",
        "Custom branding",
        "Priority support",
      ],
      cta: "Go Enterprise",
    },
  ];

  const plans =
    userRole === "Recruiter" ? recruiterPlans : jobSeekerPlans;

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-medium mb-1">
        Plans for {userRole}
      </h2>

      <p className="text-sm text-default-500 mb-8">
        Pick a plan that fits your needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-xl border flex flex-col gap-4 ${
              plan.featured
                ? "border-primary shadow-md"
                : "border-default-200"
            }`}
          >
            {plan.badge && (
              <span className="self-start px-3 py-1 text-xs rounded-md bg-primary/10 text-primary">
                {plan.badge}
              </span>
            )}

            <div>
              <h3 className="text-lg font-medium">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold">
                  {plan.price}
                </span>
                <span className="text-sm text-default-400">
                  / {plan.period}
                </span>
              </div>
            </div>

            <ul className="flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                >
                  ✓ {feature}
                </li>
              ))}
            </ul>
              
            <form action="/api/checkout_sessions" method="POST">
            <section>
              <button type="submit" role="link" className={`w-full text-blue-700 font-semibold  py-2.5 rounded-lg ${
                plan.featured
                  ? "bg-primary text-white"
                  : "border border-default-200"
              }`}>
                {plan.cta}
              </button>
            </section>
          </form>

           
          </div>
        ))}
      </div>
    </section>
  );
}

export default Planspage;