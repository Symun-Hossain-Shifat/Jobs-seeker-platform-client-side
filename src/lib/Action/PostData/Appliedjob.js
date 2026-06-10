export async  function PostAppliedJob (JobData) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/appliedjob` , {
          method : 'POST', 
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(JobData)
        })
        const result = await res.json();
        return result ;
}