import { useQuery } from "@tanstack/react-query"
import { getListMemberApi, getMessagesApi } from "../services/chatRoomService"

export const useChatRoom = () => {


    const useGetMemeberList = (workspaceId: string, projectId: string) => {
        return useQuery({
            queryKey: ["members", projectId],
            queryFn: () => getListMemberApi(workspaceId, projectId),
            enabled: !!workspaceId && !!projectId,
        })
    }

//     const useGetMessages = (projectId: string, userId: string, recipientId: string) => {
//     return useQuery({
//       queryKey: ["messages", projectId, userId, recipientId],
//       queryFn: () => getMessagesApi(projectId, recipientId),
//       enabled: !!projectId && !!userId && !!recipientId,
//     });
//   };

const useGetMessages = (projectId: string, recipientId: string) => {
    return useQuery({
      queryKey: ["messages", projectId, recipientId],
      queryFn: () => getMessagesApi(projectId, recipientId),
      enabled: !!projectId && !!recipientId,
    });
  };

    return {useGetMemeberList, useGetMessages}
}