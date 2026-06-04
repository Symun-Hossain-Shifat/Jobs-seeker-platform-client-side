'use client'
import { authClient } from '@/lib/auth-client'
import React from 'react'

function Dashboardpage () {

    const { data: session } = authClient.useSession()
    const User = session?.user
    console.log(User)


  return (
    <div className='max-h-screen'>

        <h1 className='bold text-3xl p-5'>Welcome back , {User?.name}</h1>
    </div>
  )
}

export default Dashboardpage 