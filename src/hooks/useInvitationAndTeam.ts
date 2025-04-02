import { useMutation, useQueryClient,  } from "@tanstack/react-query";
import { acceptInvitationApi } from "../services/invitationAndTeamService";
import { toast } from "sonner";

export const useInvitationTeamMutation = () => {
    const queryClient = useQueryClient()

    const useAcceptInvitation = useMutation({
        mutationFn: acceptInvitationApi,
        onSuccess: (response) => {
            console.log("invitation accept successfully", response)
            toast.success(response.message)
        },
        onError: (error: any) => {
            console.log("failed to accept the invitation", error)
            toast.error(error.response.data.message)
        }
    })

    return {useAcceptInvitation};
}
