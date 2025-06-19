import api from "../api/axiosInstance"
import { ICreateMeeting} from "../types/meeting"

export const createMeetingApi = async (meetingData: ICreateMeeting) => {
    const response = await api.post('meeting/create-meeting', meetingData)
    return response.data;
}


export const getMyMeetingsApi = async (status: string) => {
    const response = await api.get('meeting/get-meetings', {
        params: { statuses: status }
    });
    return response.data;
}