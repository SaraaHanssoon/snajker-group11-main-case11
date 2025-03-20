import axios from "axios";

const API_URL = "http://localhost:3000/products"; 

const productService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data; 
  },

  create: async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`); 
    return response.data;
  },

  getOne: async (id) => { 
    return await productService.getById(id);
  },

  update: async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  },

  destroy: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default productService;
