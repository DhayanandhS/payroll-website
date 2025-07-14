import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/notifications';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// ✅ Add this function to fetch all notifications
const getAllNotifications = () => axios.get(BASE_URL, getAuthHeaders());

// Optional: for filtering by userId (if backend supports it)
const getNotificationsByUser = (userId) =>
  axios.get(`${BASE_URL}/user/${userId}`, getAuthHeaders());

export default {
  getAllNotifications,
  getNotificationsByUser,
};
