// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Gardeners
  GET_GARDENERS: `${API_BASE_URL}/gardeners`,
  GET_GARDENER: (id) => `${API_BASE_URL}/gardeners/${id}`,
  CREATE_GARDENER: `${API_BASE_URL}/gardeners`,
  UPDATE_GARDENER: (id) => `${API_BASE_URL}/gardeners/${id}`,
  DELETE_GARDENER: (id) => `${API_BASE_URL}/gardeners/${id}`,

  // Tips
  GET_TIPS: `${API_BASE_URL}/tips`,
  GET_TIP: (id) => `${API_BASE_URL}/tips/${id}`,
  GET_USER_TIPS: (email) => `${API_BASE_URL}/tips/user/${email}`,
  CREATE_TIP: `${API_BASE_URL}/tips`,
  UPDATE_TIP: (id) => `${API_BASE_URL}/tips/${id}`,
  DELETE_TIP: (id) => `${API_BASE_URL}/tips/${id}`,

  // Events
  GET_EVENTS: `${API_BASE_URL}/events`,
  GET_EVENT: (id) => `${API_BASE_URL}/events/${id}`,
  CREATE_EVENT: `${API_BASE_URL}/events`,
  UPDATE_EVENT: (id) => `${API_BASE_URL}/events/${id}`,
  DELETE_EVENT: (id) => `${API_BASE_URL}/events/${id}`,

  // Users
  GET_USERS: `${API_BASE_URL}/users`,
  GET_USER: (email) => `${API_BASE_URL}/users/${email}`,
  CREATE_USER: `${API_BASE_URL}/users`,
  UPDATE_USER: `${API_BASE_URL}/users`,
  DELETE_USER: (id) => `${API_BASE_URL}/users/${id}`,
};

export default API_BASE_URL;
