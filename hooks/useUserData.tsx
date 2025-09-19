import {
    clearUser,
    loadUserFromStorage,
    loadUserFromStorageFailure,
    loadUserFromStorageSuccess
} from "@/store/slices/userSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Define RootState type for proper typing
type RootState = {
  user: {
    userInfo: any | null;
    loading: boolean;
    error: string | null;
  };
  auth: {
    isAuthenticated: boolean;
    user: any | null;
  };
  order: {
    orders: any[];
    loading: boolean;
    error: string | null;
  };
};

export const useUserData = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state: RootState) => state.user);

  // Load user data from AsyncStorage
  const loadUserData = useCallback(async () => {
    try {
      dispatch(loadUserFromStorage());

      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('token');

      if (userData && token) {
        const parsedUserData = JSON.parse(userData);
        dispatch(loadUserFromStorageSuccess(parsedUserData));
      } else {
        dispatch(loadUserFromStorageFailure('No user data found in storage'));
      }
    } catch (error) {
      console.error('Error loading user data from AsyncStorage:', error);
      dispatch(loadUserFromStorageFailure(error instanceof Error ? error.message : 'Failed to load user data'));
    }
  }, [dispatch]);

  // Save user data to AsyncStorage and Redux
  const saveUserData = useCallback(async (userData: any, token?: string) => {
    try {
      dispatch(loadUserFromStorage());

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      if (token) {
        await AsyncStorage.setItem('token', token);
      }

      dispatch(loadUserFromStorageSuccess(userData));
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
      dispatch(loadUserFromStorageFailure(error instanceof Error ? error.message : 'Failed to save user data'));
    }
  }, [dispatch]);

  // Clear user data from AsyncStorage and Redux
  const clearUserData = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
      dispatch(clearUser());
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }, [dispatch]);

  // Get specific user information
  const getUserInfo = useCallback(() => {
    return userInfo;
  }, [userInfo]);

  // Get user token
  const getToken = useCallback(async () => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }, []);

  // Load data on hook initialization
  useEffect(() => {
    if (!userInfo && !loading) {
      loadUserData();
    }
  }, [loadUserData, userInfo, loading]);

  return {
    userInfo,
    loading,
    error,
    loadUserData,
    saveUserData,
    clearUserData,
    getUserInfo,
    getToken,
  };
};
