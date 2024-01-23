import { useQuery } from '@tanstack/react-query';
import axiosClient from 'axiosClient';

export const useGetLogs = ({ page = 1, searchFilter = '' }) => {
  return useQuery(
    ['logs', page, searchFilter],
    () => axiosClient.get(`logs?page=${page}&${searchFilter ? `search=${searchFilter}&` : ''}`).then((res) => res.data),
    {}
  );
};

export const useGetLog = (logId = '') => {
  return useQuery(['logs', logId], () => axiosClient.get(`logs/${logId}`).then((res) => res.data), {
    enabled: !!logId
  });
};
