import axios from "axios";

export const getItems = async (page) => {
    try {
        const response = await axios.get(`items?page=${page}`);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const addItem = async (data) => {
    try {
        const response = await axios.post(`items`, data);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const getAges = async () => {
    try {
        const response = await axios.get(`ages`);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const getMaterials = async () => {
    try {
        const response = await axios.get(`materials`);
        return response;
    } catch (err) {
        return err.response;
    }
};