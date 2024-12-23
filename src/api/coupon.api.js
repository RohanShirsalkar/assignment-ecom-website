import api from "./config/axios.config";

export const findAllCoupons = async () => {
  const response = await api.get(`/coupon/get-coupon`);
  return response.data;
};
