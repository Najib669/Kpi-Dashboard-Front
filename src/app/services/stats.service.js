import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetInterventionstoday = () => {
  return useQuery(['intervention-today'], () => axiosClient.get(`intervention-today`).then((res) => res.data), {});
};

export const useGetInterventionstodayCount = () => {
  return useQuery(['intervention-today-count'], () => axiosClient.get(`intervention-today-count`).then((res) => res.data), {});
};
export const useGetInterventionstodayCountByState = (status = '') => {
  return useQuery(
    ['intervention-today-count', status],
    () => axiosClient.get(`intervention-today-count?status=${status}`).then((res) => res.data),
    {}
  );
};
export const useGetInterventionsByState = (status = '') => {
  return useQuery(['interventions', status], () => axiosClient.get(`intervention-today?status=${status}`).then((res) => res.data), {});
};

export const useGetInterventions = () => {
  return useQuery(['interventions'], () => axiosClient.get(`intervention-technicien`).then((res) => res.data), {});
};
export const useGetInterventionsYear = () => {
  return useQuery(['intervention-year'], () => axiosClient.get(`intervention-year`).then((res) => res.data), {});
};

export const useGetInterventionsPercentage = () => {
  return useQuery(['percentage-technicien-today'], () => axiosClient.get(`percentage-technicien-today`).then((res) => res.data), {});
};

export const useGetInterventionsStates = () => {
  return useQuery(['intervention-status'], () => axiosClient.get(`intervention-status`).then((res) => res.data), {});
};
