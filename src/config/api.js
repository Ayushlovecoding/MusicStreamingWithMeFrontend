// API Configuration
// In production, use the full backend URL
// In development, use relative path (works with Vite proxy)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://musicstreamingwithmebackend.onrender.com';

export default API_BASE_URL;