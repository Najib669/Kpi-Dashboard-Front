import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetFactures = ({ page = 1, searchFilter = '', commandeId = '' }) => {
  return useQuery(
    ['factures', page, searchFilter, commandeId],
    () => {
      if (commandeId) {
        return axiosClient
          .get(`commandes/${commandeId}/factures?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`)
          .then((res) => res.data);
      }
      return axiosClient.get(`factures?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`).then((res) => res.data);
    },
    {}
  );
};

export const useGetFacture = (factureId = '') => {
  return useQuery(['factures', factureId], () => axiosClient.get(`factures/${factureId}`).then((res) => res.data), {
    enabled: !!factureId
  });
};

export const useGetFactureTotal = (articles = []) => {
  return useQuery(
    ['factures', 'artices', articles],
    () => axiosClient.post(`commandes/articles/calcul-total`, articles).then((res) => res.data),
    {}
  );
};

export const useGetFactureNextReference = () => {
  return useQuery(['factures', 'next-reference'], () => axiosClient.get(`factures/next-reference`).then((res) => res.data), {});
};

export function useCreateFacture() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`commandes/${values?.lotChantierId}/factures`, values?.body);
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

export function useUpdateFacture() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`factures/${values?.factureId}?_method=PUT`, values?.body);
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

export function useValiderFacture() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`commandes/factures/${values?.factureId}/validate-facture`, values?.body);
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

export function useAnnulerFacture() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`commandes/factures/${values?.factureId}/cancel-facture`, values?.body);
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

export function useCreateFactureAvoir() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`commandes/${values?.lotChantierId}/factures/${values?.factureId}`, values?.body);
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

export function useDeleteFacture(factureId) {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const res = await axiosClient.delete(`factures/${factureId}`);
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
