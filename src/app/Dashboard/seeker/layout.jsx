import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


async function SeekerLayout ({children}) {
  const session = await auth.api.getSession({
        headers: await headers(),
      });
      const User = session?.user;
      console.log(User)
      if(User?.role !== 'Job Seeker'){
        redirect('/unauthorized')
      }
  return children 
}

export default SeekerLayout 