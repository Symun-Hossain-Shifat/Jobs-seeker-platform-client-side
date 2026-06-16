import React from "react";
import PostJobPage from "./PostJobForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GetSpecificCompany } from "@/lib/Action/GetData/Getjob";
import { redirect } from "next/navigation";

async function Addjobpage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const Companyinfo = await GetSpecificCompany(email);

  if (!Companyinfo || Companyinfo.length === 0) {
    redirect("/Dashboard/recruiter/Company");
  }

  return (
    <div>
      <PostJobPage Companyinfo={Companyinfo} />
    </div>
  );
}

export default Addjobpage;