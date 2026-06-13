import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

 async function ReqruiterLayout ({children}) {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    const User = session?.user;
    if(User?.role !== 'Recruiter'){
      redirect('/unauthorized')
    }
  return children 
}

export default ReqruiterLayout 