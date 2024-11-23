import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const WorkspaceIdPage = async () => {
    
  const currentUser = await getCurrent()
  
  if (!currentUser) {
    redirect('/sign-in')
  }

  return (
    <div>
      idd
    </div>
  )
}

export default WorkspaceIdPage
