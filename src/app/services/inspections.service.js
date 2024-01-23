import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetInspections = ({ searchFilter = '', userId = '', page = 1, etat = '' }) => {
  return useQuery(
    ['inspections', searchFilter, userId, page, etat],
    () =>
      axiosClient
        .get(
          `inspections?${searchFilter ? `search=${searchFilter}&` : ''}${userId ? `userId=${userId}&` : ''}${page ? `page=${page}&` : ''}${
            etat !== -1 ? `etat=${etat}&` : ''
          }`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetInspectionsProposes = ({ searchFilter = '', userId = '', page = 1 }) => {
  return useQuery(
    ['inspections-proposer', searchFilter, userId, page],
    () =>
      axiosClient
        .get(
          `inspections-proposer?${searchFilter ? `search=${searchFilter}&` : ''}${userId ? `userId=${userId}&` : ''}${
            page ? `page=${page}&` : ''
          }`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetInspection = (inspectionId = '', isInspection, isChantierFetching) => {
  return useQuery(
    ['inspections', inspectionId, isInspection, isChantierFetching],
    () => axiosClient.get(`inspections/${inspectionId}`).then((res) => res.data),
    {
      enabled: !!inspectionId
      // enabled: !!inspectionId && !!isInspection && !isChantierFetching
    }
  );
};

export const useGetProposition = (propositionId = '') => {
  return useQuery(['inspections-proposer', propositionId], () =>
    axiosClient.get(`inspections-proposer/${propositionId}`).then((res) => res.data)
  );
};

export function useUpdateInspection() {
  return useMutation(
    async ({ id = '', values }) => {
      const res = await axiosClient.put(`inspections/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useCreateInspection() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`inspections`, values);
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

export function useDeleteInspection() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`inspections/${values?.inspectionId}`);
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
export function useDeleteProposition() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`inspections-proposer/${values?.inspectionId}`);
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

export const useGetInspectionsStatistics = ({ yearFilter = 0, userId = 1 }) => {
  return useQuery(['inspections-statistics', yearFilter, userId], () =>
    axiosClient.get(`inspections/statistics/users/${userId}?${yearFilter ? `year=${yearFilter}&` : ''}`).then((res) => res.data)
  );
};

export const useGetInspectionsTechniciens = ({ userId = '' }) => {
  return useQuery(
    ['inspections-techniciens', userId],
    () => axiosClient.get(`inspections/${userId}/techniciens-disponibles`).then((res) => res.data),
    {
      enabled: !!userId
    }
  );
};
export const useGetInspectionsStatsByCommande = (commandeId = '') => {
  return useQuery(
    ['inspections-stats-commande', commandeId],
    () => axiosClient.get(`inspections/statistics/commande/${commandeId}`).then((res) => res.data),
    {
      enabled: !!commandeId
    }
  );
};

export function useValiderPropositions() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ values }) => {
      const res = await axiosClient.post(`inspections/validate-propositions`, values);
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

export function useGenererInspectionsRapport() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ values, inspectionId }) => {
      const res = await axiosClient.post(`rapports/${inspectionId}/generate-pdf`, values);
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
export function useValidateInspections() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ inspectionId }) => {
      const res = await axiosClient.put(`inspections/${inspectionId}/validate`);
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

export const useGetInspectionFormulaire = ({ inspectionId = '' }) => {
  return useQuery(['inspections', 'formulaire', inspectionId], () =>
    axiosClient.get(`inspections/${inspectionId}/formulaire`).then((res) => res.data)
  );
};
