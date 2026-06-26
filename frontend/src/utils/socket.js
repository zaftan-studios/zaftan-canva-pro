import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const socket = io(API_URL);

export default socket;

export const connectSocket = () => {
  socket.on('connect', () => {
    console.log('🔌 Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
  });
};