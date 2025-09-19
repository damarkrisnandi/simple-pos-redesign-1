import {
    clearUser,
    loadUserFromStorage,
    loadUserFromStorageFailure,
    loadUserFromStorageSuccess
} from '@/store/slices/userSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';

export class UserStorageService {
  private static readonly USER_DATA_KEY = 'userData';
  private static readonly TOKEN_KEY = 'token';
  private static readonly USER_PREFERENCES_KEY = 'userPreferences';

  /**
   * Load user data from AsyncStorage and update Redux store
   */
  static async loadUserFromStorage(dispatch: Dispatch) {
    try {
      dispatch(loadUserFromStorage());

      const userData = await AsyncStorage.getItem(this.USER_DATA_KEY);
      const token = await AsyncStorage.getItem(this.TOKEN_KEY);

      if (userData && token) {
        const parsedUserData = JSON.parse(userData);
        dispatch(loadUserFromStorageSuccess(parsedUserData));
        return { userData: parsedUserData, token };
      } else {
        dispatch(loadUserFromStorageFailure('No user data found in storage'));
        return null;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load user data';
      dispatch(loadUserFromStorageFailure(errorMessage));
      console.error('Error loading user data from AsyncStorage:', error);
      return null;
    }
  }

  /**
   * Save user data to AsyncStorage and update Redux store
   */
  static async saveUserToStorage(dispatch: Dispatch, userData: any, token?: string) {
    try {
      dispatch(loadUserFromStorage());

      await AsyncStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
      if (token) {
        await AsyncStorage.setItem(this.TOKEN_KEY, token);
      }

      dispatch(loadUserFromStorageSuccess(userData));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save user data';
      dispatch(loadUserFromStorageFailure(errorMessage));
      console.error('Error saving user data to AsyncStorage:', error);
      return false;
    }
  }

  /**
   * Clear all user-related data from AsyncStorage and Redux store
   */
  static async clearUserData(dispatch: Dispatch) {
    try {
      await AsyncStorage.multiRemove([
        this.USER_DATA_KEY,
        this.TOKEN_KEY,
        this.USER_PREFERENCES_KEY
      ]);
      dispatch(clearUser());
      return true;
    } catch (error) {
      console.error('Error clearing user data:', error);
      return false;
    }
  }

  /**
   * Get specific user information without updating Redux
   */
  static async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(this.USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Get user token
   */
  static async getToken() {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * Save user preferences
   */
  static async saveUserPreferences(preferences: any) {
    try {
      await AsyncStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return false;
    }
  }

  /**
   * Get user preferences
   */
  static async getUserPreferences() {
    try {
      const preferences = await AsyncStorage.getItem(this.USER_PREFERENCES_KEY);
      return preferences ? JSON.parse(preferences) : null;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    }
  }

  /**
   * Update specific user data field
   */
  static async updateUserField(dispatch: Dispatch, fieldPath: string, value: any) {
    try {
      const userData = await this.getUserData();
      if (userData) {
        // Simple dot notation path update
        const pathParts = fieldPath.split('.');
        let current = userData;

        for (let i = 0; i < pathParts.length - 1; i++) {
          if (!current[pathParts[i]]) {
            current[pathParts[i]] = {};
          }
          current = current[pathParts[i]];
        }

        current[pathParts[pathParts.length - 1]] = value;

        return await this.saveUserToStorage(dispatch, userData);
      }
      return false;
    } catch (error) {
      console.error('Error updating user field:', error);
      return false;
    }
  }
}
