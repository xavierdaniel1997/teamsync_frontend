import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (token: string): Socket | null => {
    if (socket) {
        return socket;
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    socket = io(socketUrl, {
        withCredentials: true,
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    })


    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
        if (err.message === 'Invalid token') {
            window.location.href = '/login';
        }
    });

    return socket;
}


export const getSocket = (): Socket | null => socket;


export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};