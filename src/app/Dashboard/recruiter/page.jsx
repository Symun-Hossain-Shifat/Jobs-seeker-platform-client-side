


import CardSection from "@/Components/Dashcard";
import JobsTable from "@/Components/JobsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";




export default async function Dashboardpage() {


const session = await auth.api.getSession({
    headers: await headers(),
  });
  const User = session?.user;



  return (
    <div className="max-h-screen p-5">
      <h1 className="text-3xl font-bold py-5">
        Welcome back, {User?.name}
      </h1>

      <CardSection></CardSection>
      <JobsTable></JobsTable>
    </div>
  );
}