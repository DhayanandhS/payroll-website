import axios from "axios";

const API_BASE = "http://localhost:8080/api/users";

// 🔐 Attach JWT token
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 🔁 CRUD operations with headers
const getAllUsers = () => axios.get(API_BASE, getAuthHeaders());
const createUser = (userData) => axios.post(API_BASE, userData, getAuthHeaders());
const updateUser = (id, userData) => axios.put(`${API_BASE}/${id}`, userData, getAuthHeaders());
const deleteUser = (id) => axios.delete(`${API_BASE}/${id}`, getAuthHeaders());

// ✅ Export as named object
const userService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;

