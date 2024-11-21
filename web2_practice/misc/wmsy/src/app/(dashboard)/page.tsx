
import {UserButton} from "@/features/auth/components/user-button";
import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

export default async function Home() {

  const currentUser = await getCurrent()
  
  if (!currentUser) {
    redirect('/sign-in')
  }

  return(
      <div className="bg-neutral-500 p-4 h-full">
        <CreateWorkspaceForm />
      </div>
  )
}
