

import { getCurrent } from '@/features/auth/queries'
import MembersList from '@/features/workspaces/components/members-list'
import { redirect } from 'next/navigation'
import React from 'react'

const WorkspaceIdMemberPage = async () => {

    const user = await getCurrent()
    if (!user) {
        redirect('/sign-in')
    }

  return (
    <div className='w-full lg:max-w-screen-xl'>
      <MembersList />
    </div>
  )
}

export default WorkspaceIdMemberPage
