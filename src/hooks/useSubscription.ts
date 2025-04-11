import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createSubscriptionApi, getMySubscriptionApi,  } from "../services/subscriptionAuthService"

export const useSubscriptionMutation = () => {
    const queryClient = useQueryClient()

    const useCreateSubscription = useMutation({
        mutationFn: createSubscriptionApi,
        onSuccess: (response) => {
            console.log("Subscription created successfully", response)
            queryClient.invalidateQueries({ queryKey: ["subscription"] });
        },
        onError: (error) => {
            console.log("Error while subscribing", error)
        }
    })

    const useGetMySubscription = useQuery({
        queryKey: ["subscription"],
        queryFn: getMySubscriptionApi
    })

    return {useCreateSubscription, useGetMySubscription}
}