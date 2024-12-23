import api from "./config/axios.config";

export const addToCart = async (data) => {
  const response = await api.post(`/cart/addtocart`, data);
  return response.data;
};

export const findCartByUserId = async (userID) => {
  const response = await api.post(`/cart/get-cart`, userID);
  return response.data;
};
