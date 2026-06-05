// export async  function GetJob (companyId , status) {
//         console.log(companyId,status)
//      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/alljobs?companyId=${companyId}&status=${status}`)
//         const result = await res.json();
//         return result ;
// }


export async function GetJob(companyId, status) {
  console.log("INPUT:", companyId, status);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const url = `${baseURL}/api/alljobs?companyId=${companyId}&status=${status}`;

  console.log("FINAL URL:", url);

  const res = await fetch(url);
  const result = await res.json();

  return result;
}