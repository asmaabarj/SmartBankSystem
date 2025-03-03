import axios from 'axios';
import { Account } from '../types/Account';

const API_URL = 'http://localhost:8082/api/accounts';

export const accountService = {
    getAll: async (): Promise<Account[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getByCustomerId: async (customerId: number): Promise<Account[]> => {
        const response = await axios.get(`${API_URL}/customer/${customerId}`);
        return response.data;
    },

    create: async (account: Account): Promise<Account> => {
        const response = await axios.post(API_URL, account);
        return response.data;
    },

    getById: async (id: number): Promise<Account> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
};