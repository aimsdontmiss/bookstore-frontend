import axios from 'axios';


const orderItemApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

export const listOrderItem = async ({ order_id }) => {
    const response = await orderItemApi.get(`order-item-list/${order_id}/`)
    return response.data
}

export const detailOrderItem = async ({ order_id, product_id }) => {
    const response = await orderItemApi.get(`order-item-detail/${order_id}/${product_id}/`)
    return response.data
}

// export const addOrderItem = async ({orderItem}) => {
//     return await orderItemApi.post("order-item-create/", {orderItem})
// }

export const addOrderItem = async ({ orderItem }) => {
    try {
      const response = await orderItemApi.post("order-item-create/", orderItem);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// export const updateOrderItem = async ({orderItem}) => {
//     return await orderItemApi.patch(`order-item-update/${orderItem.id}/`, {orderItem})
// }

export const updateOrderItem = async ({ id, updatedFields }) => {
  try {
    const response = await orderItemApi.patch(`order-item-update/${id}/`, updatedFields);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteOrderItem = async ({ id }) => {
    return await orderItemApi.delete(`order-item-delete/${id}/`, id)
}

export default orderItemApi;