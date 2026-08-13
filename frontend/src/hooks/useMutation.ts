import { useState } from 'react';

interface MutationOptions {
  path: string;
  method?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useMutation(options: MutationOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (_variables?: any) => {
    setIsLoading(true);
    try {
      // Mock mutation
      await new Promise(resolve => setTimeout(resolve, 500));
      if (options.onSuccess) options.onSuccess();
    } catch (error) {
      if (options.onError) options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
