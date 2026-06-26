// ============================================================
// FILE: frontend/src/utils/socket.js
// CHANGE: Use VITE_API_URL instead of hardcoded localhost
// ============================================================

import { io } from 'socket.io-client';

// Use environment variable, fallback to localhost for development
import { API_URL } from '../config/apiUrl';

const socket = io(API_URL, {
  autoConnect: true,
  reconnection: true,
});

export default socket;