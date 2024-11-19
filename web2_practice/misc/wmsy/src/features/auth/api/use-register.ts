import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation} from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.auth.register['$post']>
type RequestType = InferRequestType<typeof client.api.auth.register['$post']>

export const useRegister = () => {
    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({json}) => {
            const response = await client.api.auth.register['$post']({json})
            return await response.json()
        }
    })
}
