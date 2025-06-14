import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteNotificationApi, getNotificationsApi, updateNotificationApi } from "../services/notificationService"
import { toast } from "sonner"
import { INotification } from "../types/notification"

export const useNotifications = (filter: 'all' | 'read' | 'unread' = 'all') => {
    const queryClient = useQueryClient()

    
    const useGetNotifications = useQuery({
        queryKey: ['notifications', filter],
        queryFn: () => getNotificationsApi(filter),
    })

    const useUpdateNotification = useMutation({
        mutationFn: (notificationId: string) => updateNotificationApi(notificationId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("Notification marked as read");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to mark notification as read");
        },
    });



    // const useDeleteNotification = useMutation({
    //     mutationFn: (notificationId: string) => deleteNotificationApi(notificationId),
    //     onSuccess: (response) => {
    //         queryClient.invalidateQueries({ queryKey: ["notifications"] });
    //         toast.success(response?.data?.message || "Deleted Successfully");
    //     },
    //     onError: (error: any) => {
    //         toast.error(error?.response?.data?.message || "Failed to remove notification")
    //     }
    // })


    const useDeleteNotification = useMutation({
        mutationFn: (notificationId: string) => deleteNotificationApi(notificationId),
        onMutate: async (notificationId: string) => {
            await queryClient.cancelQueries({ queryKey: ["notifications", filter] });
            const previousNotifications = queryClient.getQueryData<{ data: INotification[] }>(["notifications", filter]);
            if (previousNotifications) {
                queryClient.setQueryData(["notifications", filter], {
                    ...previousNotifications,
                    data: previousNotifications.data.filter((notification) => notification._id !== notificationId),
                });
            }
            return { previousNotifications };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications", filter] });
            toast.success("Deleted Successfully");
        },
        onError: (error: any, notificationId, context: any) => {
            if (context?.previousNotifications) {
                queryClient.setQueryData(["notifications", filter], context.previousNotifications);
            }
            toast.error(error?.response?.data?.message || "Failed to remove notification");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });




    return { useGetNotifications, useUpdateNotification, useDeleteNotification };
}

