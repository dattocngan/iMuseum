import axios from 'axios';

export const getCollectorInformation = async () => {
  try {
    const response = await axios.get(`auth/collector`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const updateCollectorInformation = async (data) => {
  try {
    const response = await axios.put(`auth/collector/modify`, data);
    return response;
  } catch (err) {
    return err.response;
  }
};
