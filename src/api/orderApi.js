import axios from 'axios';


const orderApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

export const listOrder = async () => {
    const response = await orderApi.get("order-list/")
    return response.data
}

export const detailOrder = async ({ customer_id }) => {
    try {
      const response = await orderApi.get(`order-detail/${customer_id}/`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.error('Status Code:', error.response.status);
        console.error('Response Data:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
  
      // You can throw the error again if you want to propagate it to the calling code
      // throw error;
  
      // Alternatively, you can return a custom error object or value
      return { error: 'An error occurred while fetching the order details.' };
    }
  };

// export const detailOrder = async ({ customer_id }) => {
//     const response = await orderApi.get(`order-detail/${customer_id}/`)
//     return response.data
// }

export const addOrder = async (order) => {
    return await orderApi.post("order-create/", order)
}

export const updateOrder = async (order) => {
    return await orderApi.patch(`order-update/${order.id}/`, order)
}

export const deleteOrder = async ({ id }) => {
    return await orderApi.delete(`order-delete/${id}/`, id)
}

export default orderApi;