// ============================================================
// FILE: frontend/src/utils/socket.js
// CHANGE: Use VITE_API_URL instead of hardcoded localhost
// ============================================================

import { io } from 'socket.io-client';

// Use environment variable, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const socket = io(API_URL, {
  autoConnect: true,
  reconnection: true,
});

export default socket;