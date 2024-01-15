import axios from 'axios';


const customerApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

export const listCustomer = async () => {
    const response = await customerApi.get("customer-list/")
    return response.data
}

export const detailCustomer = async ({ user_id }) => {
    const response = await customerApi.get(`customer-detail/${user_id}/`)
    return response.data
}

export const addCustomer = async (customer) => {
    return await customerApi.post("customer-create/", customer)
}

export const updateCustomer = async (customer) => {
    return await customerApi.patch(`customer-update/${customer.id}/`, customer)
}

export const deleteCustomer = async ({ id }) => {
    return await customerApi.delete(`customer-delete/${id}/`, id)
}

export default customerApi;