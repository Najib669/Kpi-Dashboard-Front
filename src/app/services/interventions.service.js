import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetInterventions = ({ paginated = false, pageSize, page }) => {
  return useQuery(
    ['interventions', paginated, pageSize, page],
    () =>
      axiosClient
        .get(`intervention-technicien?${paginated ? `paginated=true&page_size=${pageSize}&page=${page}` : ''}`)
        .then((res) => res.data),
    {}
  );
};

export const useGetIntervention = (interventionId = '') => {
  return useQuery(
    ['interventions', interventionId],
    () => axiosClient.get(`intervention-technicien/${interventionId}`).then((res) => res.data),
    {
      enabled: !!interventionId
      // enabled: !!interventionId && !!isIntervention && !isChantierFetching
    }
  );
};
export const useGetInterventionForm = (interventionId = '') => {
  return useQuery(
    ['interventions-form', interventionId],
    () => axiosClient.get(`form-intervention/${interventionId}`).then((res) => res.data),
    {
      enabled: !!interventionId
      // enabled: !!interventionId && !!isIntervention && !isChantierFetching
    }
  );
};
export const useGeneratePDF = (interventionId = '') => {
  return useQuery(['interventions-pdf', interventionId], () =>
    axiosClient.get(`/rapports/${interventionId}/generate-pdf`).then((res) => res.data)
  );
};

export function useUpdateIntervention(id) {
  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`intervention-technicien/${id}?_method=PUT`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}
export function useUpdateInterventionCalandar({ updateFile = true }) {
  return useMutation(
    async ({ values, id }) => {
      const res = await axiosClient.put(`intervention-technicien/${id}/${updateFile}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useCreateIntervention() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`intervention-technicien`, values);
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

// export function useDeleteIntervention(interventionId = '') {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (values) => {
//       const res = await axiosClient.delete(`interventions/${values?.interventionId}`);
//       return res.data;
//     },
//     {
//       onSuccess: (data) => {
//         toast.success(data?.message);
//         queryClient.invalidateQueries();
//       }
//     }
//   );
// }

export function useDeleteIntervention(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.delete(`intervention-technicien/${id}`, values);
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
