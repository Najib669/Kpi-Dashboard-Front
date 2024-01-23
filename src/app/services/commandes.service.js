import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetCommandes = ({ searchFilter = '', page = 1, validated, paginated = true }) => {
  return useQuery(
    ['commandes', searchFilter, page, validated],
    () =>
      axiosClient
        .get(`commandes?${page ? `page=${page}&` : ''}${searchFilter ? `search=${searchFilter}&` : ''}${`paginated=${paginated}&`}`)
        .then((res) => res.data),
    {}
  );
};

export const useGetCommandeArticles = ({ commandeId = '' }) => {
  return useQuery(
    ['commandes', commandeId, 'articles'],
    () => axiosClient.get(`commandes/${commandeId}/articles`).then((res) => res.data),
    { enabled: !!commandeId }
  );
};

export const useGetCommande = (commandeId = '') => {
  return useQuery(['commande', commandeId], () => axiosClient.get(`commandes/${commandeId}`).then((res) => res.data), {});
};

export function useCreateCommande() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`commandes`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries();
      }
    }
  );
}

export function useDeleteCommande() {
  const queryClient = useQueryClient();

  return useMutation(
    async (commandeId) => {
      const res = await axiosClient.delete(`commandes/${commandeId}`);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries();
      },
      onError: (data) => {
        // toast.error(data?.response?.data?.message);
      }
    }
  );
}
