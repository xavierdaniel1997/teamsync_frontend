import { useQuery } from "@tanstack/react-query"
import { getListMemberApi } from "../services/chatRoomService"

export const useChatRoom = () => {


    const useGetMemeberList = (workspaceId: string, projectId: string) => {
        return useQuery({
            queryKey: ["members", projectId],
            queryFn: () => getListMemberApi(workspaceId, projectId),
            enabled: !!workspaceId && !!projectId,
        })
    }

    return {useGetMemeberList}
}