import axios from "axios";

export const getCollections = async (page) => {
    try {
        const response = await axios.get(`collections?page=${page}`);
        return response;
    } catch (err) {
        return err.response;
    }
};

export const createCollection = async (collection) => {
    try {
      const response = await axios.post(`collections`, collection);
      return response;
    } catch (err) {
      return err.response;
    }
}