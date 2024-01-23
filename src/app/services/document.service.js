import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetDocuments = ({ page = 1, searchFilter = '' }) => {
  return useQuery(
    ['documents', page, searchFilter],
    () => axiosClient.get(`documents?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`).then((res) => res.data),
    {}
  );
};

export const useGetDocumentVersions = ({ documentId, page = 1, searchFilter = '' }) => {
  return useQuery(
    ['documents', documentId, 'versions', page, searchFilter],
    () =>
      axiosClient
        .get(`documents/${documentId}/versions?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`)
        .then((res) => res.data),
    {}
  );
};

export const useGetDocumentsCategories = () => {
  return useQuery(['documents', 'categories'], () => axiosClient.get(`documents/categories`).then((res) => res.data), {});
};

export const useGetDocument = (documentId = '') => {
  return useQuery(['documents', documentId], () => axiosClient.get(`documents/${documentId}`).then((res) => res.data), {
    enabled: !!documentId
  });
};

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`documents`, values);
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

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ documentId, values }) => {
      const res = await axiosClient.post(`documents/${documentId}?_method=put`, values);
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

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ documentId }) => {
      const res = await axiosClient.delete(`documents/${documentId}`);
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
