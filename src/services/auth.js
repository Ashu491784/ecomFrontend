import API from "./api";

const register = (userData) => {
    try{
      const response =  API.post('users/register', userData);
      return response.userData;
    }catch(error){
        throw error.response.data;

    }
};

const login = async(credentials) => {
    try{
    const response = await API.post('users/login', credentials);
    return response.userData;
    }catch(error){
        throw error.response.data;
    }
};

const getProfil = async () => {
    try{
        const response = await API.get('users/profile');
        return response.userData;
    }catch(error){
        throw error.response.data;
    }
}

export default {register, login, getProfil};