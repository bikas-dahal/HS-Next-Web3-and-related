import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'
import { WorkspaceIdClient } from './client'

const WorkspaceIdPage = async () => {
    
  const currentUser = await getCurrent()
  
  if (!currentUser) {
    redirect('/sign-in')
  }

  return (
    <WorkspaceIdClient />
  )
}

export default WorkspaceIdPage
