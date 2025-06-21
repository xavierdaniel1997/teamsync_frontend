
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getSocket } from '../config/socket';

interface IncomingCall {
  callerId: string;
  roomID: string;
  callerName: string;
}

interface IncomingMeeting {
  meetingId: string;
  roomId: string;
  initiatorId: string;
  initiatorName: string;
}

// interface MeetingDetails {
//   meetingId: string;
//   roomId: string;
//   participantIds: string[];
//   initiatorId: string;
// }


interface CallContextType {
  callActive: boolean;
  incomingCall: IncomingCall | null;
  initiateVideoCall: (recipientId: string, recipientName: string) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  startGroupMeeting: (meetingId: string, roomId: string, participantIds: string[]) => void;
  joinGroupMeeting: (meetingId: string, roomId: string, participantIds?: string[], initiatorId?: string) => void;
  endGroupMeeting: (meetingId: string, roomId: string, participantIds: string[]) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

interface CallProviderProps {
  children: React.ReactNode;
}


export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
  const [callActive, setCallActive] = useState(false);
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [incomingMeeting, setIncomingMeeting] = useState<IncomingMeeting | null>(null);
  const zegoContainerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);

  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);
  const currentUserName = useSelector((state: RootState) => state.auth.user?.fullName || 'User');

  console.log("from the callcontext", incomingMeeting)

  const resetCallState = () => {
    if (zpRef.current) {
      try {
        zpRef.current.hangUp();
        zpRef.current.destroy?.(); 
      } catch (error) {
        console.error('Failed to clean up Zego instance:', error);
      }
      zpRef.current = null;
    }
    setCallActive(false);
    setIncomingCall(null);
    setIncomingMeeting(null);
    setTimeout(() => {
      if (zegoContainerRef.current) {
        zegoContainerRef.current.innerHTML = '';
        zegoContainerRef.current.style.width = '0';
        zegoContainerRef.current.style.height = '0';
      }
    }, 100);
  };


  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('incomingCall', ({ callerId, roomID, callerName }) => {
      if (!callActive) {
        setIncomingCall({ callerId, roomID, callerName });
      }
    });

    socket.on('callRejected', () => {
      resetCallState();
      alert('Call was rejected by the recipient.');
    });

    socket.on('callEnded', () => {
      resetCallState();
    });

    socket.on('incomingGroupMeeting', ({ meetingId, roomId, initiatorId, initiatorName }) => {
      if (!callActive) {
        setIncomingMeeting({ meetingId, roomId, initiatorId, initiatorName });
      }
    });

    socket.on('userJoinedMeeting', ({ userId }) => {
      console.log(`User ${userId} joined the meeting`);
    });

    socket.on('groupMeetingEnded', () => {
      resetCallState();
    });

    return () => {
      socket.off('incomingCall');
      socket.off('callRejected');
      socket.off('callEnded');
      socket.off('incomingGroupMeeting');
      socket.off('userJoinedMeeting');
      socket.off('groupMeetingEnded');
    };
  }, [callActive]);

  const initiateVideoCall = (recipientId: string, recipientName: string) => {
    if (!zegoContainerRef.current || !currentUserId || !currentUserName || callActive) {
      console.log('Cannot initiate call:', {
        zegoContainer: !!zegoContainerRef.current,
        currentUserId,
        currentUserName,
        callActive,
        recipientName
      });
      return;
    }

    // Reset container
    if (zegoContainerRef.current) {
      zegoContainerRef.current.innerHTML = '';
    }

    // console.log('Initiating video call to:', recipientId, recipientName);
    try {
      const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;

      console.log("from the callContext.tsx appID and serverSecret", appID, serverSecret)

      const userIdNum = parseInt(currentUserId);
      const recipientIdNum = parseInt(recipientId);
      const roomID = `chat_${Math.min(userIdNum, recipientIdNum)}_${Math.max(userIdNum, recipientIdNum)}`;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, currentUserId, currentUserName);
      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);
      console.log('Zego instance created:', zpRef.current);

      zpRef.current.joinRoom({
        container: zegoContainerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
        showPreJoinView: false,
        showScreenSharingButton: false,
        onJoinRoom: () => {
          console.log('Joined room:', roomID);
          setCallActive(true);
          const socket = getSocket();
          socket?.emit('initiateCall', {
            callerId: currentUserId,
            recipientId: recipientId,
            callerName: currentUserName,
            roomID,
          });
        },
        onLeaveRoom: () => {
          console.log('Left room:', roomID);
          resetCallState();
        },
      });
    } catch (error: any) {
      console.error('Failed to initiate call:', error);
      alert('Failed to start call. Please try again.');
    }
  };

  const acceptCall = () => {
    if (!zegoContainerRef.current || !currentUserId || !currentUserName || !incomingCall) return;

    // Reset container
    if (zegoContainerRef.current) {
      zegoContainerRef.current.innerHTML = '';
    }

    try {
      const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        incomingCall.roomID,
        currentUserId,
        currentUserName
      );

      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current.joinRoom({
        container: zegoContainerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
        showPreJoinView: false,
        onJoinRoom: () => setCallActive(true),
        onLeaveRoom: () => {
          resetCallState();
        },
      });
      setIncomingCall(null);
    } catch (error: any) {
      console.error('Failed to accept call:', error);
      alert('Failed to accept call. Please try again.');
    }
  };

  const rejectCall = () => {
    if (incomingCall) {
      const socket = getSocket();
      socket?.emit('rejectCall', { callerId: incomingCall.callerId, roomID: incomingCall.roomID });
      resetCallState();
    }
  };


  const endCall = () => {
    resetCallState();
    const socket = getSocket();
    socket?.emit('endCall', { recipientId: incomingCall?.callerId, roomID: incomingCall?.roomID });
  };


 const joinGroupMeeting = (meetingId: string, roomId: string, participantIds?: string[], initiatorId?: string) => {
    if (!zegoContainerRef.current || !currentUserId || !currentUserName || callActive) {
      console.warn('Cannot join meeting:', {
        zegoContainer: !!zegoContainerRef.current,
        currentUserId,
        currentUserName,
        callActive,
      });
      return;
    }

    if (zegoContainerRef.current) {
      zegoContainerRef.current.innerHTML = '';
    }

    try {
      const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        currentUserId,
        currentUserName
      );
      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

      zpRef.current.joinRoom({
        container: zegoContainerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
        showPreJoinView: false,
        showScreenSharingButton: true,
        onJoinRoom: () => {
          console.log('Joined group meeting:', roomId);
          setCallActive(true);
          setIncomingMeeting(null);
          const socket = getSocket();
          socket?.emit('joinGroupMeeting', { meetingId, roomId, userId: currentUserId });
        },
        onLeaveRoom: () => {
          console.log('Left group meeting#############################:', participantIds, initiatorId);
          resetCallState();
          endGroupMeeting(meetingId, roomId, participantIds!);
          // if (currentUserId === initiatorId) {
          //   console.log('Initiator leaving, ending group meeting');
          //   endGroupMeeting(meetingId, roomId, participantIds!);
          // } else {
          //   resetCallState();
          // }
        },
      });
    } catch (error) {
      console.error('Failed to join group meeting:', error);
      alert('Failed to join meeting. Please try again.');
    }
  };

  const startGroupMeeting = (meetingId: string, roomId: string, participantIds: string[]) => {
    if (!currentUserId) {
      console.warn('No current user ID');
      return;
    }
    joinGroupMeeting(meetingId, roomId);
    const socket = getSocket();
    socket?.emit('startGroupMeeting', {
      meetingId,
      roomId,
      initiatorId: currentUserId,
      initiatorName: currentUserName,
      participantIds,
    });
  };

  const endGroupMeeting = (meetingId: string, roomId: string, participantIds: string[]) => {
  console.log('Ending group meeting$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4:', { meetingId, roomId, participantIds });
  resetCallState();
  const socket = getSocket();
  socket?.emit('endGroupMeeting', { meetingId, roomId, participantIds });
};

  return (
    <CallContext.Provider
      value={{
        callActive,
        incomingCall,
        initiateVideoCall,
        acceptCall,
        rejectCall,
        endCall,
        startGroupMeeting,
        joinGroupMeeting,
        endGroupMeeting,
      }}
    >
      {children}
      <div
        ref={zegoContainerRef}
        className={`fixed inset-0 z-[9999] bg-black transition-all duration-300 ${callActive ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        style={{
          width: callActive ? '100vw' : '0',
          height: callActive ? '100vh' : '0',
        }}
      />
    </CallContext.Provider>
  );
};