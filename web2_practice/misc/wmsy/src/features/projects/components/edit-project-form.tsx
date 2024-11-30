'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  updateProjectSchema, 
  updateProjectType, 
} from "@/schemas/projectSchema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Project } from "@/schemas/types";
import { useUpdateProject } from "../api/use-update-project";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteProject } from "../api/use-delete-project";
 
interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}

export const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormProps) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [DeleteDialog, confirmDelete] = useConfirm(
    'Delete project',
    'Are you sure you want to delete this project?',
    'destructive'
  )


  const { mutate: updateProject, isPending } = useUpdateProject()

  const { mutate: deleteproject, isPending: isDeletingproject } = useDeleteProject()



  const form = useForm<updateProjectType>({
    resolver: zodResolver(updateProjectSchema), 
    defaultValues: { 
      ...initialValues,
      image: initialValues.image || undefined
     },
  });

  const onSubmit = (values: updateProjectType) => {

    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : ""
    }

    updateProject({ 
      form: finalValues,
      param: { projectId: initialValues.$id }
    })
    console.log(values);
  };

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) return

    deleteproject({ 
      param: { 
        projectId: initialValues.$id 
      } 
    }, {
      onSuccess: () => {
        window.location.href = `/workspaces/${initialValues.workspaceId}`
      }
    })
  }

    
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue('image', file)
    }
  }


  return (
    <div className="flex flex-col gap-y-4">
    <DeleteDialog />
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0 ">
        <Button size={'sm'} variant={'secondary'} onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)}>
          <ArrowLeftIcon className="size-4 mr-1" />
          Back
        </Button>
        <CardTitle className="text-xl font-bold">
          {initialValues.name}
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
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <div className="size-[72px] relative overflow-hidden ">
                        <Image
                          fill
                          className="object-cover"
                          alt='logo'
                          src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                        />
                        </div>
                    ) : (
                      <Avatar className="size-[56px] items-center justify-center bg-slate-200">
                        <AvatarFallback>
                          <ImageIcon className="size-[36px] text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )
                  }
                  <div className="flex flex-col">
                    <p className="text-sm">
                      project Icon
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jpg, png, svg, or jpeg | max 1MB
                    </p>
                    <input 
                      title="hi"
                      className="hidden"
                      accept=".jpg, .png, .svg, /jpeg"
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                      disabled={isPending}
                    />
                    {field.value ? (
                      <Button
                        type="button"
                        disabled={isPending}
                        variant={'destructive'}
                        size={'xs'}
                        className="w-fit mt-2"
                        onClick={() => {
                          field.onChange(null)
                          if (inputRef.current) {
                            inputRef.current.value = ''
                          }
                        }}
                      >
                        Remove Image
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        disabled={isPending}
                        variant={'teritary'}
                        size={'xs'}
                        className="w-fit mt-2"
                        onClick={() => inputRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                    ) }
                  </div>
                  </div>
              
                </div>
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
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

    <Card className="w-full h-full shadow-none border-none">
      <CardContent className="p-7">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">Once you delete a project, there is no going back. Please be certain.</p>
          <Separator />
          <Button 
          className="mt-1 w-fit ml-auto bg-red-500"
            variant="destructive" 
            size="sm"
            disabled={isPending || isDeletingproject}
            onClick={() => {
              handleDelete()
            }}
          >
            Delete Project
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};