import API from "./api";

const register = async (userData) => {
    try {
        const response = await API.post('users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const login = async (credentials) => {
    try {
        const response = await API.post('users/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getProfile = async () => {
    try {
        const response = await API.get('users/profile');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export default { register, login, getProfile };