import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './base-axios';

type Credentials = {
  email: string;
  password: string;
}

type User = {
  id: string;
  email: string;
  name: string;
};

const login = async  (user: Credentials) => {
  try {
    console.log('Logging in user:', user );
    // Assuming the API endpoint for login is '/auth/login'
    const response = await axiosInstance.post( '/auth/login', {
      email: user.email,
      password: user.password
    });
    console.log('Login response:', response.data);
    if (response.data.success) {
      // Store user data and token in AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      await AsyncStorage.setItem('token', response.data.data.token); // Assuming token is part of the response
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error: any) {
    console.error('Login error:', error.message || error);
    throw error;
  }
  // const response = await axiosInstance.post<User>(`${process.env.BASE_API_URL}/auth/login`, user);
  // if (response.status === 200) {
  //   return response.data;
  // } else {
  //   throw new Error('Login failed');
  // }
}

export {
  login
};

