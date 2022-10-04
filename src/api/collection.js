import axios from "axios";

export const getCollections = async (page) => {
    try {
        const response = await axios.get(`collections?page=${page}`);
        return response;
    } catch (err) {
        return err.response;
    }
};