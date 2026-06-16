'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const GetSessionToken = async() => {
    
    const session = await auth.api.getSession({
        headers: await headers(),
      });
      const User = session?.session?.token;
      return User
}