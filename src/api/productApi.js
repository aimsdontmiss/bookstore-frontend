import axios from 'axios';


const productApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

export const listProduct = async () => {
    const response = await productApi.get("product-list/")
    return response.data
}

export const detailProduct = async ({ id }) => {
    const response = await productApi.get(`product-detail/${id}/`)
    return response.data
}

export const addProduct = async (product) => {
    return await productApi.post("product-create/", product)
}

export const updateProduct = async (product) => {
    return await productApi.patch(`product-update/${product.id}/`, product)
}

export const deleteProduct = async ({ id }) => {
    return await productApi.delete(`product-delete/${id}/`, id)
}

export default productApi;