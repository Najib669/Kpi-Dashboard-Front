import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetCategories = ({ page = 1, searchFilter = '' }) => {
  return useQuery(
    ['categories', page, searchFilter],
    () => axiosClient.get(`categories?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`).then((res) => res.data),
    {}
  );
};

export const useGetCategorieVersions = ({ categorieId, page = 1, searchFilter = '' }) => {
  return useQuery(
    ['categories', categorieId, 'versions', page, searchFilter],
    () =>
      axiosClient
        .get(`categories/${categorieId}/versions?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`)
        .then((res) => res.data),
    {}
  );
};

export const useGetCategoriesCategories = () => {
  return useQuery(['categories', 'categories'], () => axiosClient.get(`categories/categories`).then((res) => res.data), {});
};

export const useGetCategorie = (categorieId = '') => {
  return useQuery(['categories', categorieId], () => axiosClient.get(`categories/${categorieId}`).then((res) => res.data), {
    enabled: !!categorieId
  });
};

export function useCreateCategorie() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`categories`, values);
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

export function useUpdateCategorie() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ categorieId, values }) => {
      const res = await axiosClient.post(`categories/${categorieId}?_method=put`, values);
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

export function useDeleteCategorie() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ categorieId }) => {
      const res = await axiosClient.delete(`categories/${categorieId}`);
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
