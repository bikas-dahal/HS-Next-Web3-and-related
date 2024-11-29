'use client'

import { Analytics } from "@/components/analytics"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher"
import { PencilIcon } from "lucide-react"
import Link from "next/link"

export const ProjectIdClient = () => {

    const projectId = useProjectId()

    const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId })
    const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({ projectId })

    const isLoading = isLoadingProject || isLoadingAnalytics

    if (isLoading) return <PageLoader />

    if (!project ) {
        <PageError message="Project not found" />
    }

    return (
        <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 item-center">
          <ProjectAvatar name={project?.name} image={project?.image} classname="size-8"/>
          <p className="text-lg font-semibold">
            {project?.name}
          </p>
        </div>
        <div>
          <Button variant={'secondary'} size={'sm'} asChild>
            <Link href={`/workspaces/${project?.workspaceId}/projects/${project?.$id}/settings`}>
              <PencilIcon size={16} />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      { analytics && (
          <Analytics data={analytics} />
      )}
      <TaskViewSwitcher hideProjectFilter />
    </div>
    )
}