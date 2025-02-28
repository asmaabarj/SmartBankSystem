import axios from 'axios';
import { Customer } from '../types/Customer';

const API_URL = 'http://localhost:8080/api/customers';
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});
export const customerService = {
    getAll: async (): Promise<Customer[]> => {
        try {
            console.log('Début de la requête vers:', API_URL);
            const response = await axios.get(API_URL);
            console.log('Réponse brute:', response);
            console.log('Données reçues:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Erreur détaillée:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
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