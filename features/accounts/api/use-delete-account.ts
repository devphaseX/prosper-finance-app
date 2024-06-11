import { InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>;

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationKey: ['accounts', { id }],
    mutationFn: async () => {
      const response = await client.api.accounts[':id'].$delete({
        param: { id },
      });

      if (!response.ok) {
        return await response.json();
      }

      return response.json();
    },

    onSuccess: () => {
      toast.success('Account deleted');
      queryClient.removeQueries({ queryKey: ['accounts', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },

    onError: () => {
      toast.error('Failed to delete account');
    },
  });

  return mutation;
};
