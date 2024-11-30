import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation"
import { WorkspaceIdJoinClient } from "./client"


const WorkspaceIdJoinPage = async () => {

  const user = await getCurrent()
  if (!user) {
    redirect('/sign-in')
  }

  // const initialValues = await getWorkspaceInfo({ workspaceId: params.workspaceId})

  // if (!initialValues) {
  //   redirect('/')
  // }

  return (
    <WorkspaceIdJoinClient />
  )
}

export default WorkspaceIdJoinPage
