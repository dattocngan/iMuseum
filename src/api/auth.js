import axios from "axios";

export const setHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const register = async (value) => {
    try {
        const response = await axios.post('auth/signup', value);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const login = async (value) => {
    try {
        const response = await axios.post('auth/login', value);
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const verify = async (value) => {
    try {
        const response = await axios.post('auth/signup/verify', value);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const refreshOtp = async (value) => {
    try {
        const response = await axios.post('auth/signup/verify', value);
        return response;
    } catch (err) {
        return err.response;
    }
};