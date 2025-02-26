import axios from 'axios';
import { Customer } from '../types/Customer';

const API_URL = 'http://localhost:8080/api/customers';

export const customerService = {
    getAll: async (): Promise<Customer[]> => {
        try {
            const response = await axios.get(API_URL);
            console.log('Response data:', response.data); // Pour le débogage
            return response.data;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    getById: async (id: number): Promise<Customer> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    create: async (customer: Customer): Promise<Customer> => {
        const response = await axios.post(API_URL, customer);
        return response.data;
    }
};