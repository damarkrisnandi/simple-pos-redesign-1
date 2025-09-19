import React from 'react';

type MutationStatus = 'idle' | 'loading' | 'success' | 'error';

interface MutationState<TData, TError> {
  status: MutationStatus;
  data: TData | null;
  error: TError | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface MutationOptions<TData, TVariables, TError> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | null, error: TError | null, variables: TVariables) => void;
}

interface MutationResult<TData, TVariables, TError> extends MutationState<TData, TError> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}

function usePost<TData = unknown, TVariables = unknown, TError = Error>({
  mutationFn,
  onSuccess,
  onError,
  onSettled
}: MutationOptions<TData, TVariables, TError>): MutationResult<TData, TVariables, TError> {
  const [state, setState] = React.useState<MutationState<TData, TError>>({
    status: 'idle',
    data: null,
    error: null,
    isIdle: true,
    isLoading: false,
    isSuccess: false,
    isError: false
  });

  const reset = React.useCallback(() => {
    setState({
      status: 'idle',
      data: null,
      error: null,
      isIdle: true,
      isLoading: false,
      isSuccess: false,
      isError: false
    });
  }, []);

  const mutate = React.useCallback((variables: TVariables) => {
    setState(prev => ({
      ...prev,
      status: 'loading',
      isIdle: false,
      isLoading: true,
      isSuccess: false,
      isError: false
    }));

    mutationFn(variables)
      .then(data => {
        console.log("Mutation successful:", data);
        setState({
          status: 'success',
          data,
          error: null,
          isIdle: false,
          isLoading: false,
          isSuccess: true,
          isError: false
        });

        onSuccess?.(data, variables);
        onSettled?.(data, null, variables);
      })
      .catch(error => {
        console.error("Mutation failed:", error);
        setState({
          status: 'error',
          data: null,
          error: error as TError,
          isIdle: false,
          isLoading: false,
          isSuccess: false,
          isError: true
        });

        onError?.(error as TError, variables);
        onSettled?.(null, error as TError, variables);
      });
  }, [mutationFn, onSuccess, onError, onSettled]);

  const mutateAsync = React.useCallback(async (variables: TVariables): Promise<TData> => {
    setState(prev => ({
      ...prev,
      status: 'loading',
      isIdle: false,
      isLoading: true,
      isSuccess: false,
      isError: false
    }));

    try {
      const data = await mutationFn(variables);

      setState({
        status: 'success',
        data,
        error: null,
        isIdle: false,
        isLoading: false,
        isSuccess: true,
        isError: false
      });

      onSuccess?.(data, variables);
      onSettled?.(data, null, variables);
      return data;
    } catch (error) {
      setState({
        status: 'error',
        data: null,
        error: error as TError,
        isIdle: false,
        isLoading: false,
        isSuccess: false,
        isError: true
      });

      onError?.(error as TError, variables);
      onSettled?.(null, error as TError, variables);
      throw error;
    }
  }, [mutationFn, onSuccess, onError, onSettled]);

  return {
    ...state,
    mutate,
    mutateAsync,
    reset
  };
}

export default usePost;
