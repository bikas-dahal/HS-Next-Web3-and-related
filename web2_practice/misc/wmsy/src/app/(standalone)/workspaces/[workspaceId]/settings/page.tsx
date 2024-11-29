import { getCurrent } from '@/features/auth/queries'
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form'
import { redirect } from 'next/navigation'
import React from 'react'
import { WorkspaceIdSettingsClient } from './client'



const WorkspaceIdSettingPage =  async () => {

    const user = await getCurrent()

    if (!user) {
        redirect('/sign-in')
    }

    // const initialValues = await getWorkspace({ workspaceId: params.workspaceId })

    // if (!initialValues) {
    //     redirect('/')
    // }

  return (
    <WorkspaceIdSettingsClient />
  )
}

export default WorkspaceIdSettingPage
