import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetClients = ({ paginated = false, pageSize, page }) => {
  return useQuery(
    ['clients', paginated, pageSize, page],
    () => axiosClient.get(`clients?${paginated ? `paginated=true&page_size=${pageSize}&page=${page}` : ''}`).then((res) => res.data),
    {}
  );
};

export const useGetClient = (clientId = '') => {
  return useQuery(['clients', 'client', clientId], () => axiosClient.get(`clients/${clientId}`).then((res) => res.data), {});
};

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`clients`, values);
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

export function useUpdateClient(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`clients/${id}?_method=put`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useDeleteClient(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`clients/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useToggleClientStatus(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`clients/${id}/toggle-active-status`, values);
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
export function useToggleClientAuth(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`clients/${id}/auth`, values);
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

export function useDeleteClientMutation(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`clients/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        // queryClient.invalidateQueries();
      }
    }
  );
}

export function useSyncUserPermissions() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, values }) => {
      const res = await axiosClient.post(`users/${id}/sync-permissions?_method=put`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries();

        toast.success(data?.message);
      }
    }
  );
}

export const useGetNotifications = () => {
  return useQuery(['notifications'], () => axiosClient.get(`/user-notifications`).then((res) => res.data), {});
};

export const useMarkNotificationAsRead = () => {
  return useMutation(({ id }) => axiosClient.post(`/notifications/${id}/vue`).then((res) => res.data), {});
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation(() => axiosClient.post(`/notifications/vue`).then((res) => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};
