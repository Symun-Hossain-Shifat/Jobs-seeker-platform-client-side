"use client";

import { useState } from "react";
import { Check, Briefcase } from "lucide-react";

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      price: "$0",
      featured: false,
      features: [
        "Daily AI market brief",
        "Venture salary bands",
        "Company insight dashboards",
        "1 click apply",
      ],
    },
    {
      name: "Growth",
      price: "$17",
      featured: true,
      features: [
        "Daily AI market brief",
        "Verified salary bands",
        "Company insight dashboards",
        "1 click apply, unlimited",
      ],
    },
    {
      name: "Premium",
      price: "$99",
      featured: false,
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shadow mode",
        "Priority referrals",
      ],
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
            Pricing
          </p>

          <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mx-auto">
            Pay for the leverage,
            <br />
            not the listings
          </h2>

          {/* Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-full flex items-center">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  billing === "monthly"
                    ? "bg-white text-black"
                    : "text-gray-400"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBilling("yearly")}
                className={`px-5 py-2 rounded-full text-sm transition relative ${
                  billing === "yearly"
                    ? "bg-white text-black"
                    : "text-gray-400"
                }`}
              >
                Yearly
                <span className="ml-2 bg-pink-600 text-white text-[10px] px-2 py-1 rounded-full">
                  25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 flex flex-col ${
                plan.featured
                  ? "bg-white text-black border-white scale-100 md:scale-105"
                  : "bg-[#0a0a0a] border-zinc-800"
              }`}
            >
              {/* Plan Name */}
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span className="font-medium">{plan.name}</span>
              </div>

              {/* Price */}
              <div className="mt-5">
                <h3 className="text-5xl font-bold">{plan.price}</h3>
                <p
                  className={`text-sm mt-1 ${
                    plan.featured ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  / month
                </p>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4 flex-grow">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div
                      className={`p-1 rounded-full ${
                        plan.featured
                          ? "bg-black text-white"
                          : "bg-zinc-800 text-white"
                      }`}
                    >
                      <Check size={12} />
                    </div>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`mt-8 w-full rounded-xl py-3 font-medium transition ${
                  plan.featured
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "bg-zinc-900 hover:bg-zinc-800"
                }`}
              >
                Choose This Plan →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}