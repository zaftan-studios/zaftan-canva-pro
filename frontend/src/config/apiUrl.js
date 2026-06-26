// ============================================================
// FILE: frontend/src/config/apiUrl.js
// ============================================================

const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && window.location.hostname === 'localhost';

const getLocalApiUrl = () =>
  isBrowser
    ? `${window.location.protocol}//${window.location.hostname}:5000`
    : '';

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (isLocalhost ? getLocalApiUrl() : (isBrowser ? window.location.origin : ''));
