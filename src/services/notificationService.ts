import api from "../api/axiosInstance";

export const getNotificationsApi = async (filter: 'all' | 'read' | 'unread' = 'all') => {
    const response = await api.get("notification/my-notifications", {
        params: { filter }
    });
    return response.data;
}

export const updateNotificationApi = async (notificationId: string) => {
    const response = await api.put(`notification/mark-as-read/${notificationId}`)
    return response.data;
}

export const deleteNotificationApi = async (notificationId: string) => {
    const response = await api.delete(`notification/delete-notification/${notificationId}`)
    return response.data;
}