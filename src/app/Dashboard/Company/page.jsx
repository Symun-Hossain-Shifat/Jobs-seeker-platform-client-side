import React from 'react'
import CompanyProfile from './Company'

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { GetCompany } from '@/lib/Action/GetData/Getjob';

async function CompanyPage () {

    
   
   const session = await auth.api.getSession({
       headers: await headers(),
     });
     const User = session?.user?.id;
    console.log(JSON.stringify(session, null, 2));
      console.log(User)
   const Company = await GetCompany(User)
   console.log(Company)
  return (
    <div>

        <CompanyProfile id={User} CompanyName={Company}></CompanyProfile></div>
  )
}

export default CompanyPage 