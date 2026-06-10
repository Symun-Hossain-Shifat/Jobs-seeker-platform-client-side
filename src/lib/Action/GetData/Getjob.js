
export async function GetCompany(userId) {
  if (!userId) {
    console.log("No userId!");
    return [];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companyinfo?recruiterId=${userId}`
  );

  const result = await res.json();
  console.log("API RESULT:", result);

  return result;
}

export async function GetJob(companyId, status) {
  console.log("COMPANY ID:", companyId);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
 console.log(`${baseURL}/api/alljobs?companyId=${companyId}&status=${status}`)
  const res = await fetch(
    `${baseURL}/api/alljobs?companyId=${companyId}&status=${status}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}





export async function GetSpecificJob(id) {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${baseURL}/api/alljobs/${id}`);

  return await res.json();
}




export async function GetAllJob() {
  

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const url = `${baseURL}/api/alljobs`;

  

  const res = await fetch(url);
  const result = await res.json();

  return result;
}