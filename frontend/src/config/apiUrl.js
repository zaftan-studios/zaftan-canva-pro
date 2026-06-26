// ============================================================
// FILE: frontend/src/config/apiUrl.js
// ============================================================

const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && window.location.hostname === 'localhost';

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (isLocalhost ? 'http://localhost:5000' : (isBrowser ? window.location.origin : ''));
