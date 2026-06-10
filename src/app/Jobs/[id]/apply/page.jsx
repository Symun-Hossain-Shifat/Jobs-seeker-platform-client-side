
import JobApplicationForm from "@/Components/ApplyForm";
import { GetSpecificJob } from "@/lib/Action/GetData/Getjob";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page({ params }) {

      const {id} = await params 
      const job = await GetSpecificJob(id)
      console.log(job)
      

      
          const session = await auth.api.getSession({
              headers: await headers(),
            });
            const User = session?.user;
            console.log(User)

  return <div className="bg-black ">

<div className="p-10">
<h1 className="font-semibold text-2xl my-5"> Apply page for {params.id}</h1>
<Link href={`/Jobs/${id}`} className="text-blue-600 "> Back</Link>
   
    <JobApplicationForm Job={job} Userinfo={User}></JobApplicationForm>
    
</div>
     
    
    
    </div>;
}