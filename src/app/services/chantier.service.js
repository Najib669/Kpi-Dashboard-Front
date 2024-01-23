import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetChantiers = ({
  LotChantierId = '',
  a_inspecterFilter = '',
  page = 1,
  etatFilter = 'false',
  searchFilter = '',
  userId = '',
  paginated = true
}) => {
  return useQuery(
    ['chantiers', LotChantierId, a_inspecterFilter, page, etatFilter, searchFilter, paginated],
    () =>
      axiosClient
        .get(
          `chantiers?page=${page}&${paginated ? `paginated=${paginated}&` : ''}${LotChantierId ? `LotChantierId=${LotChantierId}&` : ''}${
            [0, 1].includes(a_inspecterFilter) ? `InspectionChantier=${a_inspecterFilter}&` : ''
          }${etatFilter !== 'false' ? ([1].includes(etatFilter) ? `etat=1,2&` : `etat=${etatFilter}&`) : ''}${
            searchFilter ? `search=${searchFilter}&` : ''
          }${userId ? `userId=${userId}&` : ''}`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetChantiersExcel = ({
  LotChantierId = '',
  a_inspecterFilter = '',
  page = 1,
  etatFilter = 'false',
  searchFilter = '',
  userId = '',
  paginated = true
}) => {
  return useQuery(
    ['chantiers', LotChantierId, a_inspecterFilter, page, etatFilter, searchFilter, paginated],
    () =>
      axiosClient
        .get(
          `chantiers?page=${page}&${paginated ? `paginated=${paginated}&` : ''}${LotChantierId ? `LotChantierId=${LotChantierId}&` : ''}${
            [0, 1].includes(a_inspecterFilter) ? `InspectionChantier=${a_inspecterFilter}&` : ''
          }${etatFilter !== 'false' ? ([1].includes(etatFilter) ? `etat=1,2&` : `etat=${etatFilter}&`) : ''}${
            searchFilter ? `search=${searchFilter}&` : ''
          }${userId ? `userId=${userId}&` : ''}`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetChantier = (chantierId = '') => {
  return useQuery(['chantiers', chantierId], () => axiosClient.get(`chantiers/${chantierId}`).then((res) => res.data), {
    enabled: !!chantierId
  });
};

export function useCreateChantier() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`chantiers`, values);
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

export const useGetChantierHistorique = ({ chantierId = '' }) => {
  return useQuery(
    ['chantiers', 'historique', chantierId],
    () => axiosClient.get(`chantiers/${chantierId}/historiques`).then((res) => res.data),
    {
      enabled: !!chantierId
    }
  );
};
