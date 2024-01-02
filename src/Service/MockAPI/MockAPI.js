import axios from "axios";
export const API_URL =
  "https://64d5b552613ee4426d97895d.mockapi.io/form/Drivers";

export const deleteData = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/" + id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/" + id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createUser = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getData = async (id) => {
  try {
    const response = await axios.get(API_URL + "/" + id);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUser = async (id) => {
  try {
    const response = await axios.get(API_URL + "/" + id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const putData = async (id, formData) => {
  try {
    const response = await axios.put(API_URL + "/" + id, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await axios.put(API_URL + "/" + id, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    throw error;
  }
};






