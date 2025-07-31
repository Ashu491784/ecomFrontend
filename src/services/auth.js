import API from "./api";

// Register user
const register = async (userData) => {
  try {
    const response = await API.post('users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await API.post('users/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Get user profile (protected route)
const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw { message: "No token found" };

    const response = await API.get('users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetching profile failed" };
  }
};

export default { register, login, getProfile };
