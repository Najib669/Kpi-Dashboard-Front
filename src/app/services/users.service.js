import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetUsers = ({ paginated = false, pageSize, page }) => {
  return useQuery(
    ['users', paginated, pageSize, page],
    () => axiosClient.get(`users?${paginated ? `paginated=true&page_size=${pageSize}&page=${page}` : ''}`).then((res) => res.data),
    {}
  );
};

export const useGetUser = (clientId = '') => {
  return useQuery(['users', 'user', clientId], () => axiosClient.get(`users/${clientId}`).then((res) => res.data), {});
};

export const useGetUserPermissions = (clientId = '') => {
  return useQuery(
    ['users-permissions', 'user', clientId],
    () => axiosClient.get(`users/${clientId}/authorized-permissions`).then((res) => res.data),
    {}
  );
};

export const useGetColors = () => {
  return useQuery(['techniciens-colors'], () => axiosClient.get(`technicien/colors`).then((res) => res.data), {});
};

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`users`, values);
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

export function useUpdateUser(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`users/${id}?_method=put`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useDeleteUser(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`users/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useToggleUserStatus(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`users/${id}/toggle-active-status`, values);
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
export function useToggleUserAuth(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`users/${id}/auth`, values);
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
export function useChangeLoginCredentials(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`users/${id}/set-login-credentials`, values);
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
export function useChangeMyLoginCredentials() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`user/credentials`, values);
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

export function useDeleteUserMutation(id = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`users/${id}`, values);
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
