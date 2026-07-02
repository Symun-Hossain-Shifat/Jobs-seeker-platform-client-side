import { GetUsers } from '@/lib/Action/GetData/getUser'
import React from 'react'

async function Dashboarduserpage () { 
  const user = await GetUsers()
  console.log(user)
  return (
    <div>Userpage  </div>
  )
}

export default Dashboarduserpage 