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
} from "@/schemas/createWorkspaceSchema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
 
interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate: createWorkspace, isPending } = useCreateWorkspace()

  const form = useForm<createWorkspaceType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (values: createWorkspaceType) => {
    createWorkspace({ json: values })
    console.log(values);
    // Add your submission logic here
  };


  return (
    <Card className="w-full h-full shadow-none border-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a New Workspace
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-5">
                    {field.value ? (
                      <div>
                        <Image />
                        </div>
                    ) : (
                      <Avatar>
                        
                      </Avatar>
                    )
                    )}
                  </div>
                  <Button
                  type="button"
                  variant="outline"
                  onClick={() => inputRef.current?.click()}
                  >
                    Upload Image
                  </Button>
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
                onClick={() => {}} 
                size="lg"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="">
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};