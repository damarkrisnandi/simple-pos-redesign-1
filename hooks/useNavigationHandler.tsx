import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export const useNavigationHandler = () => {
  const router = useRouter();

  const safeGoBack = useCallback(() => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push('/');
      }
    } catch (error) {
      console.warn('Navigation error:', error);
      router.replace('/');
    }
  }, [router]);

  const safeNavigate = useCallback((path: string) => {
    try {
      router.push(path);
    } catch (error) {
      console.warn('Navigation error:', error);
      router.replace(path);
    }
  }, [router]);

  const safeReplace = useCallback((path: string) => {
    try {
      router.replace(path);
    } catch (error) {
      console.warn('Navigation replace error:', error);
      // Fallback to push if replace fails
      router.push(path);
    }
  }, [router]);

  return {
    safeGoBack,
    safeNavigate,
    safeReplace,
    router,
  };
};