'use client'


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  createWorkspaceSchema, 
  createWorkspaceType 
} from "@/schemas/workspaceSchema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useCreateProject } from "../api/use-create-project";
import { useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createProjectSchema, createProjectType } from "@/schemas/projectSchema";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
 
interface CreateprojectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateprojectFormProps) => {

  const workspaceId = useWorkspaceId()

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { mutate: createproject, isPending } = useCreateProject()

  const form = useForm<createProjectType>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: { name: "" },
  });

  const onSubmit = (values: createProjectType) => {

    const finalValues = {
      ...values,
      workspaceId,
      image: values.image instanceof File ? values.image : ""
    }

    createproject({ form: finalValues }, {
      onSuccess: ({ data }) => {
        form.reset()
        router.push(`/workspaces/${workspaceId}/projects/${data.$id}`)
      }

    })
    console.log(values);
    // Add your submission logic here
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue('image', file)
    }
  }

  return (
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a New Project
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
                      Project Icon
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jpg, png, svg, or jpeg | max 1MB
                    </p>
                    <input 
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
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};