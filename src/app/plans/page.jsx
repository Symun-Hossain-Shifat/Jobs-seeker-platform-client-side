import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react'

async function Planspage () {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
      let User = session?.user?.role;
      console.log(User)

      const plans = [
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

const Recruiter = [
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
    
  return (


    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-medium text-foreground mb-1">
        Plans for {User}
      </h2>
      <p className="text-default-500 text-sm mb-8">
        Pick a plan that fits your job search pace.
      </p>
      {
        User = 'Recruiter' ?  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {Recruiter.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border bg-background flex flex-col gap-4 p-6 transition-shadow ${
              plan.featured
                ? "border-primary shadow-md"
                : "border-default-200"
            }`}
          >
            {plan.badge && (
              <span className="self-start text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-md">
                {plan.badge}
              </span>
            )}

            <div>
              <p className="text-lg font-medium text-foreground">{plan.name}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-medium text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-default-400">/ {plan.period}</span>
              </div>
            </div>

            <hr className="border-default-100" />

            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-default-600">
                  <svg
                    className="w-4 h-4 text-success mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`mt-2 w-full py-2.5 rounded-lg text-sm font-medium transition-opacity ${
                plan.featured
                  ? "bg-primary text-white hover:opacity-90"
                  : "border border-default-200 text-foreground hover:bg-default-100"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>  : <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border bg-background flex flex-col gap-4 p-6 transition-shadow ${
              plan.featured
                ? "border-primary shadow-md"
                : "border-default-200"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <span className="self-start text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-md">
                {plan.badge}
              </span>
            )}

            {/* Name + Price */}
            <div>
              <p className="text-lg font-medium text-foreground">{plan.name}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-medium text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-default-400">/ {plan.period}</span>
              </div>
            </div>

            <hr className="border-default-100" />

            {/* Features */}
            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-default-600">
                  <svg
                    className="w-4 h-4 text-success mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`mt-2 w-full py-2.5 rounded-lg text-sm font-medium transition-opacity ${
                plan.featured
                  ? "bg-primary text-white hover:opacity-90"
                  : "border border-default-200 text-foreground hover:bg-default-100"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
      }

      
    </section>
  )
}

export default Planspage 