"use client";

import { PostAppliedJob } from "@/lib/Action/PostData/Appliedjob";
import { redirect } from "next/navigation";

import { useState } from "react";

export default function JobApplicationForm({ Job, Userinfo }) {
    // console.log( Userinfo)
  const [form, setForm] = useState({
    fullName: Userinfo?.name || "",
    email: Userinfo?.email || "",
    position: Job?.title || "",
    resumeUrl: "",
    
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");


  function validate(data) {
    const errs = {};

    if (!data.resumeUrl.trim()) {
      errs.resumeUrl = "Resume link is required.";
    } else if (!/^https?:\/\/.+/.test(data.resumeUrl)) {
      errs.resumeUrl = "Enter a valid URL (must start with http/https).";
    }

    if (!data.coverLetter.trim()) {
      errs.coverLetter = "Cover letter is required.";
    } else if (data.coverLetter.trim().length < 100) {
      errs.coverLetter = "Cover letter must be at least 100 characters.";
    }

    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
     const FinalData = {
          ...form,
          jobId: Job?._id,
         
          company: Userinfo.id ,
          companyname : Job.Companyname ,
          type : Job.type ,
          status : Job.status ,
          appliedAt: new Date().toISOString(),
        }
    
     const result  =  await PostAppliedJob(FinalData)
     console.log(result)
     if(result){
        alert('Applied Successfull')
     }
     redirect('/')
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-10 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Application Submitted!
          </h2>

          <p className="text-zinc-400 text-sm mb-6">
            You applied for{" "}
            <span className="font-medium text-white">{Job?.title}</span>
          </p>

          <button
            onClick={() => setStatus("idle")}
            className="px-6 py-2.5 bg-white text-black rounded-lg text-sm font-medium"
          >
            Apply Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{Job?.title}</h1>
          <p className="text-sm text-zinc-400">{Job?.company}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* User Info */}
          <Section title="Your Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadField label="Full Name" value={form.fullName} />
              <ReadField label="Email" value={form.email} />
            </div>
          </Section>

          {/* Job Info */}
          <Section title="Position Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadField label="Position" value={form.position} />
              {Job?.salary && (
                <ReadField label="Salary" value={Job.salary} />
              )}
            </div>
          </Section>

          {/* Application */}
          <Section title="Your Application">

            <Field label="Resume URL" required error={errors.resumeUrl}>
              <input
                name="resumeUrl"
                value={form.resumeUrl}
                onChange={handleChange}
                placeholder="https://drive.google.com/your-resume"
                className={inputCls(errors.resumeUrl)}
              />
            </Field>

            <Field label="Cover Letter" required error={errors.coverLetter}>
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                rows={7}
                className={inputCls(errors.coverLetter)}
              />
            </Field>

          </Section>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-white text-black font-semibold rounded-xl"
          >
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function Section({ title, children }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
        {title}
      </h2>
      {children}
    </div>
  );
}

function ReadField({ label, value }) {
  return (
    <div>
      <label className="text-xs text-zinc-400">{label}</label>
      <div className="p-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-white">
        {value || "—"}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputCls(error) {
  return `w-full p-2 rounded bg-zinc-800 text-white border ${
    error ? "border-red-500" : "border-zinc-700"
  } focus:outline-none focus:ring-2 focus:ring-white/20`;
}