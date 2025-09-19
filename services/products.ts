import axiosInstance from './base-axios';

const getProducts = async ({ search, category }: { search?: string, category?: string | null }) => {
  try {
    const searchStatement = search ? `search=${search}` : '';
    const categoryStatement = category ? `category=${category}` : '';
    const response = await axiosInstance.get(`/products?${[searchStatement, categoryStatement].filter(data => data !== '').join('&')}`); // Adjust the endpoint as needed
    console.log('Products fetched successfully:', response.data);
    if (response.status === 200) {
      return response.data; // Assuming the API returns an array of Products
    }
    throw new Error('Failed to fetch Products');
  } catch (error) {
    console.error('Error fetching Products:', error);
    return null
  }
}

export {
  getProducts
};
