import { toast } from "sonner";
import { InferRequestType ,InferResponseType} from "hono";
import { QueryClient, useMutation ,useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { json } from "stream/consumers";
type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>['json']

export const  useCreateCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response  = await client.api.categories.$post({json})
            return await response.json()
        },
        onSuccess:()=>{
            toast.success("Category created")
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
        onError:() => {
            toast.error("Failed to create category")
            
        }
    })
    return mutation
} 
