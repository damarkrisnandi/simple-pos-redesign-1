import axiosInstance from './base-axios';

const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories'); // Adjust the endpoint as needed
    console.log('Categories fetched successfully:', response.data);
    if (response.status === 200) {
      return response.data; // Assuming the API returns an array of categories
    }
    throw new Error('Failed to fetch categories');
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null
  }
}

export {
  getCategories
};