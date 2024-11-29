import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProjectIdSetttingClient } from './client'

interface ProjectIdSettingsPageProps {
    params: {
        projectId: string
    }
}

const ProjectIdSettingsPage = async ({params}: ProjectIdSettingsPageProps) => {
    
    const user = getCurrent()
    if (!user) {
        redirect('sign-in')
    }

    // const initialValues = await getProject({projectId: params.projectId})

  return (
    <ProjectIdSetttingClient />
    // <div className='w-full lg:max-w-xl'>
    //   {/* <EditProjectForm initialValues={initialValues} /> */}
    // {/* </div> */}
  )
}

export default ProjectIdSettingsPage
