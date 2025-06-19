import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createMeetingApi, getMyMeetingsApi } from "../services/meetingService"
import { toast } from "sonner"

export const useMeeting = () => {
    const queryClient = useQueryClient()

    const useCreateMeeting = useMutation({
        mutationFn: createMeetingApi,
        onSuccess: (response) => {
            console.log("response", response)
            toast.success(response?.message)
            queryClient.invalidateQueries({ queryKey: ["meeting"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message)
        }
    })


    const useGetMyMeetings = (status: string) => {
    return useQuery({
      queryKey: ['meeting', status], 
      queryFn: () => getMyMeetingsApi(status),
    });
  };

    return {useCreateMeeting, useGetMyMeetings}
}


