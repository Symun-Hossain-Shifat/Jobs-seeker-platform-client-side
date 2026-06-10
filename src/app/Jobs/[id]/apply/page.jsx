
import JobApplicationForm from "@/Components/ApplyForm";
import { GetAppliedJob, GetSpecificJob } from "@/lib/Action/GetData/Getjob";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page({ params }) {

      const {id} = await params 
      const job = await GetSpecificJob(id)
    //   console.log(job)
      

      
          const session = await auth.api.getSession({
              headers: await headers(),
            });
            const User = session?.user;
           


            const Id = User?.id
            console.log(Id)

            const result = await GetAppliedJob(Id)
            console.log(result)

  return <div className="bg-black ">

<div className="p-10">
<h1 className="font-semibold text-2xl my-5"> Apply page for {params.id}</h1>

{
    result.length < 3 ? <><Link href={`/Jobs/${id}`} className="text-blue-600 "> Back</Link>
   
    <JobApplicationForm Job={job} Userinfo={User}></JobApplicationForm></> : <div className="flex h-screen items-center justify-center flex-col"><p>Your are Up to Date . please upgrade your profile for apply more job</p> <Link href={'/plans'}><Button variant="Primary" className= 'p-3 text-xl'>
        Upgrade Now</Button></Link></div> 
}

    
</div>
     
    
    
    </div>;
}