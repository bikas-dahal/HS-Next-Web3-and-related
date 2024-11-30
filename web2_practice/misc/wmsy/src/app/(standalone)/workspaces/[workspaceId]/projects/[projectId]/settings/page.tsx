import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProjectIdSetttingClient } from './client'

const ProjectIdSettingsPage = async () => {
    
    const user = getCurrent()
    if (!user) {
        redirect('/sign-in')
    }


  return (
    <ProjectIdSetttingClient />
    // <div className='w-full lg:max-w-xl'>
    //   {/* <EditProjectForm initialValues={initialValues} /> */}
    // {/* </div> */}
  )
}

export default ProjectIdSettingsPage
