import axios from "axios";

const API_URL = "http://localhost:8000/api/product";

export const createProductApi = (formData) => {
  return axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getProductsApi = () => {
  return axios.get(API_URL);
};
