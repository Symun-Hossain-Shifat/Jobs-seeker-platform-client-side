'use client'
import Image from "next/image";
import {
  Briefcase,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
  Calendar,
  Pencil,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RecruiterProfilepage() { 
    const { data: session } = authClient.useSession() 
    const User = session?.user 
    console.log(User)
  return (
    <div className="bg-base-200 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            <Image
              src="https://i.pravatar.cc/200"
              alt="Recruiter"
              width={140}
              height={140}
              className="rounded-full border-4 border-primary"
            />

            <div className="flex-1">

              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">
                    John Anderson
                  </h1>

                  <p className="text-primary font-semibold mt-1">
                    Senior HR Manager
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <Building2 size={18} />
                    Tech Solutions Ltd.
                  </div>
                </div>

                <button className="btn btn-primary">
                  <Pencil size={18} />
                  Edit Profile
                </button>
              </div>

              <p className="mt-5 text-gray-500 leading-7">
                Passionate HR professional with 8+ years of experience
                hiring software engineers, designers, and product
                managers. Helping companies build high-performing
                engineering teams.
              </p>

            </div>

          </div>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <div className="bg-base-100 rounded-xl shadow p-6 text-center">
            <Briefcase className="mx-auto text-primary" />
            <h2 className="text-3xl font-bold mt-3">42</h2>
            <p className="text-gray-500">
              Active Jobs
            </p>
          </div>

          <div className="bg-base-100 rounded-xl shadow p-6 text-center">
            <Users className="mx-auto text-primary" />
            <h2 className="text-3xl font-bold mt-3">1,540</h2>
            <p className="text-gray-500">
              Applicants
            </p>
          </div>

          <div className="bg-base-100 rounded-xl shadow p-6 text-center">
            <Calendar className="mx-auto text-primary" />
            <h2 className="text-3xl font-bold mt-3">8 Years</h2>
            <p className="text-gray-500">
              Experience
            </p>
          </div>

          <div className="bg-base-100 rounded-xl shadow p-6 text-center">
            <Building2 className="mx-auto text-primary" />
            <h2 className="text-3xl font-bold mt-3">125</h2>
            <p className="text-gray-500">
              Hired Candidates
            </p>
          </div>

        </div>

        {/* About + Contact */}

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left */}

          <div className="lg:col-span-2 bg-base-100 rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-5">
              About Recruiter
            </h2>

            <p className="text-gray-500 leading-8">
              Experienced recruiter specializing in Software
              Engineering, Artificial Intelligence, UI/UX Design,
              Product Management, DevOps, and Cloud Computing.
              Passionate about connecting talented professionals
              with innovative companies.
            </p>

            <div className="divider"></div>

            <h2 className="text-2xl font-bold mb-5">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {[
                "Hiring",
                "Technical Interview",
                "Leadership",
                "Recruitment",
                "HR Management",
                "ATS",
                "Communication",
                "Talent Acquisition",
              ].map((skill) => (
                <span
                  key={skill}
                  className="badge p-3 badge-primary badge-lg"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Right */}

          <div className="bg-base-100 rounded-xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex gap-3">
                <Mail className="text-primary" />
                <div>
                  <p className="font-semibold">
                    Email
                  </p>
                  <p className="text-gray-500">
                    hr@techsolutions.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="text-primary" />
                <div>
                  <p className="font-semibold">
                    Phone
                  </p>
                  <p className="text-gray-500">
                    +880 1712345678
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-primary" />
                <div>
                  <p className="font-semibold">
                    Location
                  </p>
                  <p className="text-gray-500">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Globe className="text-primary" />
                <div>
                  <p className="font-semibold">
                    Website
                  </p>
                  <p className="text-primary">
                    www.techsolutions.com
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Recent Jobs */}

        <div className="bg-base-100 rounded-xl shadow p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Recently Posted Jobs
          </h2>

          <div className="space-y-5">

            {[
              "Senior Frontend Developer",
              "Backend Engineer",
              "UI/UX Designer",
              "DevOps Engineer",
            ].map((job, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {job}
                  </h3>

                  <p className="text-gray-500">
                    Full Time • Remote
                  </p>
                </div>

                <button className="btn btn-outline btn-primary">
                  View Job
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}