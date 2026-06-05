export async  function GetJob ({companyId , status}) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/alljobs?companyId=${companyId}&status=${status}`)
        const result = await res.json();
        return result ;
}