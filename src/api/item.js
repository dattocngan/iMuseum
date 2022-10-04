import axios from "axios";

export const getItems = async (page) => {
    try {
        const response = await axios.get(`items?page=${page}`);
        return response;
    } catch (err) {
        return err.response;
    }
};