import api from "./config/axios.config";

export const findAllProducts = async () => {
  const response = await api.get(`/get-product`);
  return response.data;
};

export const findProductById = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};
