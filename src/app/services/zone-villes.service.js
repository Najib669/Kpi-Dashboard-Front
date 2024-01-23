import { useQuery } from '@tanstack/react-query';
import axiosClient from 'axiosClient';

export const useGetZonesVilles = () => {
  return useQuery(['zone-villes'], () => axiosClient.get(`zone-villes`).then((res) => res.data), {});
};

export const useGetCodePostals = () => {
  return useQuery(['code-postals'], () => axiosClient.get(`code-postals`).then((res) => res.data), {});
};

export const useGetVilleCodePostals = ({ villeId = '' }) => {
  return useQuery(['ville', 'code-postals', villeId], () => axiosClient.get(`villes/${villeId}/code-postals`).then((res) => res.data), {
    enabled: !!villeId
  });
};

export const useGetVilles = () => {
  return useQuery(['villes'], () => axiosClient.get(`villes`).then((res) => res.data), {});
};

export const useGetOperations = () => {
  return useQuery(['operations'], () => axiosClient.get(`operations`).then((res) => res.data), {});
};
