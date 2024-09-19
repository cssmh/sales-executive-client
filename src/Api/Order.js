import axiosSecure from ".";

export const postOrder = async (orderData) => {
  const { data } = await axiosSecure.post("/add-order", orderData);
  return data;
};

export const getOrder = async (id) => {
  const { data } = await axiosSecure(`/order/${id}`);
  return data;
};

export const getAllOrders = async () => {
  const { data } = await axiosSecure("/all-order");
  return data;
};

export const getMyOrders = async (email) => {
  const { data } = await axiosSecure(`/my-orders?email=${email}`);
  return data;
};

export const deleteOrder = async (id) => {
  const { data } = await axiosSecure.delete(`/order/${id}`);
  return data;
};
