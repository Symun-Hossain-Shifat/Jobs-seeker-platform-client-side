import React from 'react'
import PostJobPage from './PostJobForm'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { GetSpecificCompany } from '@/lib/Action/GetData/Getjob';

async function Addjobpage () {

  
     const session = await auth.api.getSession({
         headers: await headers(),
       });
       const email = session?.user?.email;

  const Companyinfo = await GetSpecificCompany(email)
  // console.log(Companyinfo)
  return (
    <div>
      <PostJobPage Companyinfo={Companyinfo} ></PostJobPage>
    </div>
  )
}

export default Addjobpage 