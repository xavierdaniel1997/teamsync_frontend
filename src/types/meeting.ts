export interface ICreateMeeting {
    meetingId: string;
    meetingTitle: string;
    members: { userId: string; email: string }[];
    meetingDate: string;
    meetingTime: string;
    duration: string;
    description: string;

}


