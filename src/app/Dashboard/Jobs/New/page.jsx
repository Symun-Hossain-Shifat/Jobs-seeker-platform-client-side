"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Building2,
  ChevronDown,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Wifi,
  Clock,
  Users,
  Layers,
} from "lucide-react";

// ─── Zod Schema ────────────────────────────────────────────────────────────────
const jobSchema = z
  .object({
    title: z.string().min(3, "Job title must be at least 3 characters"),
    category: z.string().min(1, "Please select a category"),
    type: z.enum(["full-time", "part-time", "remote", "contract", "internship"]),
    salaryMin: z.coerce.number().min(0, "Min salary must be ≥ 0"),
    salaryMax: z.coerce.number().min(0, "Max salary must be ≥ 0"),
    currency: z.string().min(1, "Currency required"),
    isRemote: z.boolean(),
    city: z.string().optional(),
    country: z.string().optional(),
    deadline: z.string().min(1, "Deadline is required"),
    responsibilities: z.string().min(20, "Please describe responsibilities (min 20 chars)"),
    requirements: z.string().min(20, "Please describe requirements (min 20 chars)"),
    benefits: z.string().optional(),
  })
  .refine((d) => d.salaryMax >= d.salaryMin, {
    message: "Max salary must be ≥ Min salary",
    path: ["salaryMax"],
  })
  .refine((d) => d.isRemote || (d.city && d.country), {
    message: "City and Country required when not remote",
    path: ["city"],
  });

// ─── Mock company data (auto-filled) ──────────────────────────────────────────
const COMPANY = {
  name: "Nexus Technologies Ltd.",
  logo: "NT",
  industry: "Software & IT Services",
  location: "Dhaka, Bangladesh",
  approved: true,
};

// ─── Static options ────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Software Engineering",
  "Design & UX",
  "Product Management",
  "Data & Analytics",
  "Marketing",
  "Sales",
  "Finance & Accounting",
  "Human Resources",
  "Customer Support",
  "Operations",
];

const JOB_TYPES = [
  { value: "full-time", label: "Full-time", icon: Briefcase },
  { value: "part-time", label: "Part-time", icon: Clock },
  { value: "remote", label: "Remote", icon: Wifi },
  { value: "contract", label: "Contract", icon: FileText },
  { value: "internship", label: "Internship", icon: Users },
];

const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "SGD", "AED", "INR"];

// ─── Reusable field wrapper ────────────────────────────────────────────────────
function Field({ label, error, required, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
        {required && <span className="ml-1 text-amber-400">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-rose-400">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Section card ──────────────────────────────────────────────────────────────
function Section({ title, icon: Icon, accent, children }) {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-800">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          <Icon size={15} style={{ color: accent }} />
        </div>
        <h2 className="text-sm font-bold text-slate-200 tracking-wide">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Input styles ──────────────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10";
const selectCls = inputCls + " appearance-none cursor-pointer";
const textareaCls =
  "w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10 resize-none";

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: "full-time",
      currency: "USD",
      isRemote: false,
    },
  });

  const isRemote = watch("isRemote");
  const selectedType = watch("type");

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    const JobsData = {
      ...data,
      status: "active",
      companyId: "company_123",
      postedAt: new Date().toISOString(),
      visibility: "public",
    }
    const req = await fetch(`${process.env.NEXT_SERVER_URL}/alljobs` , {
      method : 'POST', 
    headers : {
      'content-type' : 'application/json'
    },
    body : JSON.stringify(JobsData)
    })
    const result = await req.json()
    console.log(result)
    // console.log(JobsData);
    setLoading(false);
    setSubmitted(true);
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (submitted) {
    
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="relative max-w-md w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 size={36} className="text-emerald-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">Job Posted!</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Your listing is now <span className="text-emerald-400 font-semibold">live and visible</span> to
            job seekers. You can manage it from your dashboard.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition"
          >
            Post Another Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* ── Header ── */}
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest">
            <Layers size={12} />
            Recruiter Dashboard
            <span className="text-slate-700">/</span>
            <span className="text-amber-400">Post a Job</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">
            Post a New Job
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Fill in the details below. Your listing will go live immediately after submission.
          </p>
        </div>

        {/* ── Company banner ── */}
        {COMPANY.approved ? (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-emerald-800/50 bg-emerald-950/30 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700/30 text-xs font-black text-emerald-300 border border-emerald-700/40">
              {COMPANY.logo}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-100 truncate">{COMPANY.name}</p>
              <p className="text-xs text-slate-400 truncate">
                {COMPANY.industry} · {COMPANY.location}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-700/50 bg-emerald-900/40 px-3 py-1">
              <CheckCircle2 size={11} className="text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Approved</span>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-800/50 bg-rose-950/30 px-5 py-4 text-sm text-rose-300">
            <AlertCircle size={16} className="shrink-0" />
            Your company profile is pending approval. You cannot post jobs yet.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* ════════════════ JOB INFO ════════════════ */}
          <Section title="Job Information" icon={Briefcase} accent="#f59e0b">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Title */}
              <div className="sm:col-span-2">
                <Field label="Job Title" required error={errors.title?.message}>
                  <input
                    {...register("title")}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* Category */}
              <Field label="Category" required error={errors.category?.message}>
                <div className="relative">
                  <select {...register("category")} className={selectCls}>
                    <option value="">Select category…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>

              {/* Deadline */}
              <Field label="Application Deadline" required error={errors.deadline?.message}>
                <div className="relative">
                  <input
                    {...register("deadline")}
                    type="date"
                    className={inputCls}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Calendar size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>

              {/* Job Type */}
              <div className="sm:col-span-2">
                <Field label="Job Type" required error={errors.type?.message}>
                  <div className="flex flex-wrap gap-2">
                    {JOB_TYPES.map(({ value, label, icon: Icon }) => {
                      const active = selectedType === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setValue("type", value)}
                          className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                            active
                              ? "border-amber-500/60 bg-amber-500/10 text-amber-300"
                              : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                          }`}
                        >
                          <Icon size={13} />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>

              {/* Salary */}
              <Field label="Min Salary" required error={errors.salaryMin?.message}>
                <div className="relative">
                  <DollarSign size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("salaryMin")}
                    type="number"
                    placeholder="0"
                    className={inputCls + " pl-8"}
                  />
                </div>
              </Field>

              <Field label="Max Salary" required error={errors.salaryMax?.message}>
                <div className="relative">
                  <DollarSign size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("salaryMax")}
                    type="number"
                    placeholder="0"
                    className={inputCls + " pl-8"}
                  />
                </div>
              </Field>

              {/* Currency */}
              <Field label="Currency" required error={errors.currency?.message}>
                <div className="relative">
                  <select {...register("currency")} className={selectCls}>
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>
            </div>
          </Section>

          {/* ════════════════ LOCATION ════════════════ */}
          <Section title="Location" icon={MapPin} accent="#6366f1">
            <div className="flex flex-col gap-5">
              <button
                type="button"
                onClick={() => setValue("isRemote", !isRemote)}
                className={`flex items-center gap-3 self-start rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  isRemote
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                }`}
              >
                <div
                  className={`relative h-5 w-9 rounded-full transition ${
                    isRemote ? "bg-indigo-500" : "bg-slate-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      isRemote ? "left-4" : "left-0.5"
                    }`}
                  />
                </div>
                <Globe size={14} />
                Remote Position
              </button>

              {!isRemote && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="City" required error={errors.city?.message}>
                    <input
                      {...register("city")}
                      placeholder="e.g. Dhaka"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Country" required error={errors.country?.message}>
                    <input
                      {...register("country")}
                      placeholder="e.g. Bangladesh"
                      className={inputCls}
                    />
                  </Field>
                </div>
              )}
            </div>
          </Section>

          {/* ════════════════ JOB DESCRIPTION ════════════════ */}
          <Section title="Job Description" icon={FileText} accent="#10b981">
            <div className="flex flex-col gap-5">
              <Field
                label="Responsibilities"
                required
                error={errors.responsibilities?.message}
                hint="What will this person do day-to-day?"
              >
                <textarea
                  {...register("responsibilities")}
                  rows={5}
                  placeholder="• Lead the frontend architecture…&#10;• Collaborate with design team…&#10;• Review pull requests…"
                  className={textareaCls}
                />
              </Field>

              <Field
                label="Requirements"
                required
                error={errors.requirements?.message}
                hint="Skills, experience, or qualifications needed."
              >
                <textarea
                  {...register("requirements")}
                  rows={5}
                  placeholder="• 3+ years of React experience…&#10;• Familiarity with TypeScript…&#10;• Strong communication skills…"
                  className={textareaCls}
                />
              </Field>

              <Field
                label="Benefits"
                error={errors.benefits?.message}
                hint="Optional — perks, health insurance, equity, etc."
              >
                <textarea
                  {...register("benefits")}
                  rows={3}
                  placeholder="• Competitive salary&#10;• Flexible working hours&#10;• Annual team retreat…"
                  className={textareaCls}
                />
              </Field>
            </div>
          </Section>

          {/* ════════════════ COMPANY (read-only) ════════════════ */}
          <Section title="Company" icon={Building2} accent="#ec4899">
            <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/40 px-5 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-700/20 text-sm font-black text-pink-300 border border-pink-700/30">
                {COMPANY.logo}
              </div>
              <div>
                <p className="font-bold text-slate-100">{COMPANY.name}</p>
                <p className="text-xs text-slate-400">
                  {COMPANY.industry} · {COMPANY.location}
                </p>
              </div>
              <p className="ml-auto text-xs text-slate-500 italic">Auto-filled</p>
            </div>
          </Section>

          {/* ════════════════ SUBMIT ════════════════ */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-500">
              Job will be saved as <span className="text-emerald-400 font-semibold">active</span> and publicly visible.
            </p>
            <button
              type="submit"
              disabled={loading || !COMPANY.approved}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Publishing…
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} />
                  Publish Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}