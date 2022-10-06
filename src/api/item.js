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

export const getItem = async (id) => {
  try {
    const response = await axios.get(`items/${id}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const updateItem = async (id, data) => {
  try {
    const response = await axios.put(`items/${id}`, data);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const deleteImages = async (id, data) => {
  try {
    const response = await axios.delete(`items/${id}/images`, {data: data});
    return response;
  } catch (err) {
    return err.response;
  }
}

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

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`items/${id}`);
    return response;
  } catch (err) {
    return err.response;
  }
}