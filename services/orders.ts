import { CartItem } from '../models/product';
import axiosInstance from './base-axios';

const createOrders = async (items: CartItem[]) => {
    try {
        const response = await axiosInstance.post('/orders', { items });
        console.log('Order created successfully:', response.data);
        if (response.status === 201) {
            return response.data; // Assuming the API returns the created Order
        }
        throw new Error('Failed to create Order');
    } catch (error) {
        console.error('Error creating Order:', error);
        return null
    }
}

export {
    createOrders
};
