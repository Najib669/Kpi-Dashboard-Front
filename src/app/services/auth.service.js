import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetLoggedInUser = () => {
  return useQuery(
    ['logged-in-user'],
    () => {
      return axiosClient.get(`loggedInUser`).then((res) => res.data);
    },
    {}
  );
};

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      await axiosClient.get('xsrf-token');
      const res = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}web/login`, values);
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
