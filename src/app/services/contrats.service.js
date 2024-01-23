import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetClientsContrats = ({ clientId }) => {
  return useQuery(['clients-contrats', clientId], () => axiosClient.get(`clients/${clientId}/contrats`).then((res) => res.data), {});
};

export const useGetContrats = ({ userId, page, searchFilter, validated }) => {
  return useQuery(
    ['contrats', validated, userId, searchFilter, page],
    () =>
      axiosClient
        .get(
          `contrats?${searchFilter ? `search=${searchFilter}&` : ''}${page ? `page=${page}&` : ''}${
            validated !== -2 ? `validated=${validated}&` : ''
          }${userId ? `userId=${userId}&` : ''}`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetContrat = (contratId) => {
  return useQuery(['contrats', contratId], () => axiosClient.get(`contrats/${contratId ? contratId : ''}`).then((res) => res.data), {});
};

export function useCreateContrat({ clientId }) {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`contrats`, values);
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

export function useUpdateContrat(contratId) {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`contrats/${contratId}?_method=PUT`, values);
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

export function useToggleContratStatus(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`contrats/${id}/toggle-active-state`, values);
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

export function useDeleteContrat(contratId) {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const res = await axiosClient.delete(`contrats/${contratId}`);
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

export const useGetContratsSkeleton = ({ contratId }) => {
  return useQuery(['contrats-skeleton', contratId], () => axiosClient.get(`contrats/${contratId}/squelette`).then((res) => res.data), {
    enabled: !!contratId
  });
};

export const useGetContratsOperations = ({ contratId }) => {
  return useQuery(['contrats-operations', contratId], () => axiosClient.get(`contrats/${contratId}/operations`).then((res) => res.data), {
    enabled: !!contratId
  });
};

export const useGetContratsOperationsUpdatePage = ({ contratId }) => {
  return useQuery(
    ['contrats-operations-update', contratId],
    () => axiosClient.get(`contrats/${contratId}/operations/update`).then((res) => res.data),
    {
      enabled: !!contratId
    }
  );
};

export function useUpdateContratsOperations({ contratId }) {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ contratId, values }) => {
      const res = await axiosClient.post(`contrats/${contratId}/operations`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        // queryClient.invalidateQueries({ queryKey: ['contrats', data?.contratId] });
        queryClient.invalidateQueries(['contrats-skeleton', contratId]);
      }
    }
  );
}

export function useUpdateContratSkeleton() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ contratId, values }) => {
      const res = await axiosClient.post(`contrats/${contratId}/squelette`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ['contrats', data?.contratId] });
      }
    }
  );
}

export function useValidateContrats(contratId = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`contrats/${contratId}/validate`, values);
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
