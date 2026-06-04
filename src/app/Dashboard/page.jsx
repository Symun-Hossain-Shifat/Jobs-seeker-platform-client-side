'use client'
import CardSection from '@/Components/Dashcard'
import { authClient } from '@/lib/auth-client'
import React from 'react'

function Dashboardpage () {

    const { data: session } = authClient.useSession()
    const User = session?.user
    console.log(User)


  return (
    <div className='max-h-screen p-5'>

        <h1 className='bold text-3xl py-5'>Welcome back , {User?.name}</h1>

        <CardSection></CardSection>
    </div>
  )
}

export default Dashboardpage 