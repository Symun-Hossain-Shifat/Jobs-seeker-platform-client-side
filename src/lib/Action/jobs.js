export async  function PostJob ({JobsData}) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/alljobs` , {
          method : 'POST', 
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(JobsData)
        })
        const result = await res.json();
        return result ;
}