import { UserStorageService } from "@/services/userStorage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Use the UserStorageService to load user data
        const result = await UserStorageService.loadUserFromStorage(dispatch);

        if (result && result.userData && result.token) {
          setIsAuthenticated(true);
          dispatch({ type: 'auth/login', payload: result.userData });
        } else {
          setIsAuthenticated(false);
          dispatch({ type: 'auth/logout' });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
        dispatch({ type: 'auth/logout' });
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return { isAuthenticated, loading };
}

export default useAuth;
