import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react'

async function SeekerLayout ({children}) {
  const session = await auth.api.getSession({
        headers: await headers(),
      });
      const User = session?.user;
      if(User?.role !== 'Job Seeker'){
        redirect('/unauthorized')
      }
  return children 
}

export default SeekerLayout 