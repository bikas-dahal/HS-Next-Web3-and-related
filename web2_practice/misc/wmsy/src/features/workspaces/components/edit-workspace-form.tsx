'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  updateWorkspaceSchema, 
  updateWorkspaceType
} from "@/schemas/workspaceSchema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
// import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "@/schemas/types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../api/use-reset-invite-code";
 
interface EditWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace
}

export const EditWorkspaceForm = ({ onCancel, initialValues }: EditWorkspaceFormProps) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [DeleteDialog, confirmDelete] = useConfirm(
    'Delete Workspace',
    'Are you sure you want to delete this workspace?',
    'destructive'
  )

  const [ResetDialog, confirmReset] = useConfirm(
    'Reset Invite Link',
    'This will reset the invite link for this workspace. Are you sure you want to proceed?',
    'destructive'
  )

  const { mutate: updateWorkspace, isPending } = useUpdateWorkspace()

  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } = useDeleteWorkspace()

  const { mutate: resetInviteCode, isPending: isResettingInviteCode } = useResetInviteCode()


  const form = useForm<updateWorkspaceType>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: { 
      ...initialValues,
      image: initialValues.image || undefined
     },
  });

  const onSubmit = (values: updateWorkspaceType) => {

    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : ""
    }

    updateWorkspace({ 
      form: finalValues,
      param: { workspaceId: initialValues.$id }
    }, 
      // onSuccess: ({ data }) => {
      //   form.reset()
      //   // router.push(`/workspaces/${data.$id}`)
      // }

    )
    // console.log(values);
  };

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) return

    deleteWorkspace({ 
      param: { 
        workspaceId: initialValues.$id 
      } 
    }, {
      onSuccess: () => {
        window.location.href = '/'
      }
    })
  }

  const handleResetInviteLink = async () => {
    const ok = await confirmReset()

    if (!ok) return

    resetInviteCode({ 
      param: { 
        workspaceId: initialValues.$id 
      } 
    })
  }
    
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue('image', file)
    }
  }

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink)
    .then(() => {
      toast.success('Invite link copied to clipboard')
    })
  }

  return (
    <div className="flex flex-col gap-y-4">
    <DeleteDialog />
    <ResetDialog />
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0 ">
        <Button size={'sm'} variant={'secondary'} onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}>
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
                  <FormControl>
                    <Input
                      placeholder="Enter workspace name"
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
                      Workspace Icon
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
          <h2 className="text-lg font-bold">Invite Members</h2>
          <p className="text-sm text-muted-foreground">Use the link given to invite members to your workspace</p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-x-2">
            <Input
              value={fullInviteLink}
              readOnly
            />
              <Button 
                // size="sm"
                variant={'secondary'}
                className="size-12"
                onClick={handleCopyInviteLink}
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>
          <Separator />
          <Button 
          className="mt-1 w-fit ml-auto bg-red-500"
            variant="destructive" 
            size="sm"
            disabled={isPending || isResettingInviteCode}
            onClick={() => {
              handleResetInviteLink()
            }}
          >
            Reset Invite link
          </Button>
        </div>
      </CardContent>
    </Card>

    <Card className="w-full h-full shadow-none border-none">
      <CardContent className="p-7">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">Once you delete a workspace, there is no going back. Please be certain.</p>
          <Separator />
          <Button 
          className="mt-1 w-fit ml-auto bg-red-500"
            variant="destructive" 
            size="sm"
            disabled={isPending || isDeletingWorkspace}
            onClick={() => {
              handleDelete()
            }}
          >
            Delete Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};