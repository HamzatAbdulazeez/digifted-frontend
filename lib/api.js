import axios from "axios";

/**
 * Shared API client. Set NEXT_PUBLIC_API_URL in .env.local:
 *   - local dev:      http://localhost:8000/api
 *   - Vercel preview:  https://api.digiftedhub.com/api  (once backend is deployed)
 *   - production:      https://api.digiftedhub.com/api
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach the Sanctum token (stored after /login or /register) to every request.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("digifted_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
