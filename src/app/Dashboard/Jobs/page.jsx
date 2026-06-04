import { Button } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

function Jobspage () {
  return (
    <div className='flex px-10 justify-between items-center'>Jobspage <Button variant="ghost"> <Link href={'/Dashboard/Jobs/New'}>Add Job</Link></Button> </div>
  )
}

export default Jobspage 