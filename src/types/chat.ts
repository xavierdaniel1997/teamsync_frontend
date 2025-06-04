export interface Message {
  _id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
}

export interface GroupedMessages {
  date: string;
  label: string;
  messages: Message[];
}