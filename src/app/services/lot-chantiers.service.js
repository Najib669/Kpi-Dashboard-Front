import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetLotChantiers = ({ searchFilter = '', userId = '', page = 1, validated }) => {
  return useQuery(
    ['lot-chantiers', searchFilter, userId, page, validated],
    () =>
      axiosClient
        .get(
          `lot-chantiers?${page ? `page=${page}&` : ''}${searchFilter ? `search=${searchFilter}&` : ''}${
            validated !== -2 ? `validated=${validated}&` : ''
          }${userId ? `userId=${userId}&` : ''}`
        )
        .then((res) => res.data),
    {}
  );
};

export const useCreateLotChantiersExcel = ({ searchFilter = '', userId = '', page = 1, validated }) => {
  return useQuery(
    ['lot-chantiers', searchFilter, userId, page, validated],
    () =>
      axiosClient
        .get(
          `lot-chantiers/export-excel?${page ? `page=${page}&` : ''}${searchFilter ? `search=${searchFilter}&` : ''}${
            validated !== -2 ? `validated=${validated}&` : ''
          }${userId ? `userId=${userId}&` : ''}`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetLotChantier = (lotChantierId = '') => {
  return useQuery(['lot-chantier', lotChantierId], () => axiosClient.get(`lot-chantiers/${lotChantierId}`).then((res) => res.data), {
    enabled: !!lotChantierId
  });
};

export function useCreateLotChantier() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`lot-chantiers`, values);
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

export function useGenerateInspections() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ LotChantierId, values }) => {
      const res = await axiosClient.post(`lot-chantiers/${LotChantierId}/generate-inspection`, values);
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
export function useValidateLot(LotChantierId = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`lot-chantiers/${LotChantierId}/validate`, values);
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

export function useDeleteLot() {
  const queryClient = useQueryClient();

  return useMutation(
    async (LotChantierId) => {
      const res = await axiosClient.delete(`lot-chantiers/${LotChantierId}`);
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

export function useEchantionner() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ values, LotChantierId }) => {
      const res = await axiosClient.post(`lot-chantiers/${LotChantierId}/echantillonnes-chantier`, values);
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

export function useChangePercentage(LotChantierId = '') {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`lot-chantiers/${LotChantierId}/change-percentage`, values);
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

export const useGetInspectionsCalendar = ({ userId, clientId }) => {
  return useQuery(
    ['inspections-calendar', userId, clientId],
    // () => axiosClient.get(`inspections/calendar?${userId ? `userIdFilter=${userId}&` : ''}`).then((res) => res.data),
    () =>
      axiosClient
        .get(`intervention-technicien?${userId ? `userIdFilter=${userId}&` : ''}${clientId ? `client_id=${clientId}&` : ''}`)
        .then((res) => res.data),
    {}
  );
};

export function useUpdateInspections(data) {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const res = await axiosClient.post(`intervention-update-dates`, data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries();
      },
      onError: (data) => {
        // console.log(data);
        // toast.error(data?.response?.data?.message);
      }
    }
  );
}

export function useSwitchInspectionProposition() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ chantierId, values = {} }) => {
      const res = await axiosClient.put(`chantiers/${chantierId}`, values);
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
