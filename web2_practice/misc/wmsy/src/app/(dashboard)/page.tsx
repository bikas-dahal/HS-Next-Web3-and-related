
import {getCurrent} from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";
import {redirect} from "next/navigation";

export default async function Home() {

  const currentUser = await getCurrent()
  
  if (!currentUser) {
    redirect('/sign-in')
  }

  const workspaces = await getWorkspaces()

  if (workspaces.total === 0) {
    redirect('/workspaces/create')
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`)
  }

  return(
      <div>
        Homepage
      </div>
  )
}
