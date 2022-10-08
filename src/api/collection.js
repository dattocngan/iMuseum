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
};

export const getCollection = async (collection_id) => {
  try {
    const response = await axios.get(`collections/${collection_id}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const updateCollection = async (id, data) => {
  try {
    const response = await axios.put(`collections/${id}`, data);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const deleteItemOfCollection = async (id, data) => {
  try {
    const response = await axios.delete(`collections/${id}/items`, {
      data: data,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
