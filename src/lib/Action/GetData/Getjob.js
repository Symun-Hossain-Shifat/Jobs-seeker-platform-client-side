


export async function GetSpecificCompany(email) {
  if (!email) {
    console.log("No userId!");
    return [];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companyinfo?email=${email}`
  );

  const result = await res.json();
  // console.log("API RESULT:", result);

  return result;
}



export async function GetAllCompany() {
  

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companyinfo`
  );

  const result = await res.json();
  // console.log("API RESULT:", result);

  return result;
}


export async function GetCompany(userId) {
  if (!userId) {
    console.log("No userId!");
    return [];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companyinfo?recruiterId=${userId}`
  );

  const result = await res.json();
  // console.log("API RESULT:", result);

  return result;
}

export async function GetJob(companyId, status) {
 

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
//  console.log(`${baseURL}/api/alljobs?companyId=${companyId}&status=${status}`)
  const res = await fetch(
    `${baseURL}/api/alljobs?companyId=${companyId}&status=${status}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}


export async function GetAppliedJobbyEmail(email) {
  console.log("COMPANY ID:", email);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
//  console.log(`${baseURL}/api/appliedjob?UserId=${UserId}`)
  const res = await fetch(`${baseURL}/api/appliedjob?email=${email}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}


export async function GetAppliedJob(company) {
  // console.log("COMPANY ID:", company);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
//  console.log(`${baseURL}/api/appliedjob?UserId=${UserId}`)
  const res = await fetch(`${baseURL}/api/appliedjob?company=${company}`,
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