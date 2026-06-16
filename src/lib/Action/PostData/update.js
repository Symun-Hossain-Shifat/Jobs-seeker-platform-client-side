'use server'
import { revalidatePath } from "next/cache";
import { AuthHeader } from "../GetData/authHeader";




export async function UpdateCompany(id, newData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/companyinfo/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", 
        ... await AuthHeader()
      },
      body: JSON.stringify(newData),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update company");
  } else {
        revalidatePath('/Dashboard/admin/companies')
    }
  
  return await res.json();
}