import { AuthHeader } from "../GetData/authHeader";

export async  function PostAppliedJob (JobData) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appliedjob` , {
          method : 'POST', 
        headers : {
          'content-type' : 'application/json' ,
          ... await AuthHeader()
        },
        body : JSON.stringify(JobData)
        })
        const result = await res.json();
        return result ;
}