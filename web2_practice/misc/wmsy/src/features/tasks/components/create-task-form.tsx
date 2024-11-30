'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
// import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateTask } from "../api/use-create-task";
import { createTaskSchema, CreateTaskType } from "@/schemas/taskSchema";
import { DatePicker } from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskStatus } from "@/schemas/types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
 
interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: {
    id: string,
    name: string,
    image: string
  }[],
  memberOptions: {
    id: string,
    name: string,
  }[]
}


export const CreateTaskForm = ({ onCancel, projectOptions, memberOptions }: CreateTaskFormProps) => {

  const workspaceId = useWorkspaceId()
  // const router = useRouter()

  const { mutate: createproject, isPending } = useCreateTask()

  const form = useForm<CreateTaskType>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
    defaultValues: { 
      workspaceId
     },
  });

  const onSubmit = (values: CreateTaskType) => {

    createproject({ json: {...values, workspaceId} }, {
      onSuccess: () => {
        form.reset()
        onCancel?.()
      }

    })
    console.log(values);
    // Add your submission logic here
  };

  return (
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a New Task
        </CardTitle>
      </CardHeader>
      <Separator className="px-7" />
      <CardContent className="p-7">
       
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4">
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
                control={form.control}
                name='dueDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='assigneeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                      <Select
                        defaultValue={field.value}  
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Assignee' />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {memberOptions.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              <div className="flex items-center gap-x-2">
                                <MemberAvatar classname="size-6" name={member.name} />
                                {member.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>                    
                    
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>

                      <Select
                        defaultValue={field.value}  
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Status' />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value={TaskStatus.BACKLOG}>
                            Backlog
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_PROGRESS}>
                            In Progress
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_REVIEW}>
                            In Review
                          </SelectItem>
                          <SelectItem value={TaskStatus.TODO}>
                            Todo
                          </SelectItem>
                          <SelectItem value={TaskStatus.DONE}>
                            Done
                          </SelectItem>
                        </SelectContent>
                      </Select>                    
                    
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='projectId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>

                      <Select
                        defaultValue={field.value}  
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select Project' />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {projectOptions.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              <div className="flex items-center gap-x-2">
                                <ProjectAvatar image={project.image} classname="size-6" name={project.name} />
                                {project.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>                    
                    
                  </FormItem>
                )}
              />
            </div>
            <Separator className="w-full" />
            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="secondary" 
                disabled={isPending}
                onClick={onCancel} 
                className={cn(!onCancel && 'invisible')}
                size="lg"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="">
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};