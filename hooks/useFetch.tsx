import { useCallback, useEffect, useRef, useState } from 'react';

// Status types similar to React Query
type Status = 'idle' | 'loading' | 'success' | 'error';

// Our custom useQuery result interface
interface UseFetchResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  status: Status;
  refetch: () => Promise<void>;
  reset: () => void;
}

interface UseFetchOptions {
  enabled?: boolean;
  retry?: number;
  retryDelay?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  staleTime?: number;
  cacheTime?: number;
}

const useFetch = <T,>(
  queryKey: unknown[],
  fetchFunction: () => Promise<T>,
  options: UseFetchOptions = {}
): UseFetchResult<T> => {
  // Default options
  const {
    enabled = true,
    retry = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    staleTime = 0,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
  } = options;

  // State for storing data, error, and status
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  // Refs for tracking cache expiration and avoiding stale closures
  const lastFetchTime = useRef<number | null>(null);
  const cacheTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCount = useRef(0);
  const queryKeyString = JSON.stringify(queryKey);
  const fetchFunctionRef = useRef(fetchFunction);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Update refs on every render to avoid stale closures
  fetchFunctionRef.current = fetchFunction;
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  // Reset function
  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setStatus('idle');
    retryCount.current = 0;
    lastFetchTime.current = null;
    if (cacheTimeout.current) {
      clearTimeout(cacheTimeout.current);
      cacheTimeout.current = null;
    }
  }, []);

  // Fetch function with stable dependencies
  const fetchData = useCallback(async (): Promise<void> => {
    // Don't fetch if not enabled
    if (!enabled) return;

    // Check if data is still fresh
    if (
      lastFetchTime.current &&
      Date.now() - lastFetchTime.current < staleTime
    ) {
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await fetchFunctionRef.current();
      setData(result);
      setStatus('success');
      lastFetchTime.current = Date.now();
      retryCount.current = 0;

      // Set cache timeout
      if (cacheTimeout.current) clearTimeout(cacheTimeout.current);
      cacheTimeout.current = setTimeout(reset, cacheTime);

      onSuccessRef.current?.(result);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      setStatus('error');
      onErrorRef.current?.(errorObj);

      // Handle retry logic
      if (retryCount.current < retry) {
        retryCount.current += 1;
        setTimeout(fetchData, retryDelay * retryCount.current);
      }
    }
  }, [enabled, retry, retryDelay, staleTime, cacheTime, reset]);

  // Initial fetch and refetch when dependencies change
  useEffect(() => {
    reset();
    if (enabled) {
      fetchData();
    }
    // Clean up on unmount
    return () => {
      if (cacheTimeout.current) {
        clearTimeout(cacheTimeout.current);
      }
    };
  }, [queryKeyString, enabled, fetchData, reset]);

  return {
    data,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
    status,
    refetch: fetchData,
    reset
  };
};

export default useFetch;
