import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import { toast } from "sonner";
type ResponseType = InferResponseType<typeof client.api.auth.register['$post']>
type RequestType = InferRequestType<typeof client.api.auth.register['$post']>

export const useRegister = () => {

    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({json}) => {
            const response = await client.api.auth.register['$post']({json})

            if (!response.ok) {
                throw new Error('Failed to register')
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Registered successfully')
            router.refresh()
            queryClient.invalidateQueries({
                queryKey: ['currentUser']
            })
        },
        onError: () => {
            toast.error('Failed to register')
        }
    })
}
