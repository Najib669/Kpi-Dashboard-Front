import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosClient from 'axiosClient';
import { toast } from 'react-toastify';

export const useGetSettingsPreferences = () => {
  return useQuery(['settings', 'preferences'], () => axiosClient.get(`settings/preferences`).then((res) => res.data), {});
};
export const useGetSettingsRoles = () => {
  return useQuery(['settings', 'roles'], () => axiosClient.get(`settings/roles`).then((res) => res.data), {});
};
export const useGetSettingsMailer = () => {
  return useQuery(['settings', 'mail'], () => axiosClient.get(`settings/mail`).then((res) => res.data), {});
};

export const useGetSettingsCurrentPieces = () => {
  return useQuery(['settings', 'current-pieces'], () => axiosClient.get(`settings/current-pieces`).then((res) => res.data), {});
};

export const useGetSettingsCurrentPiecesDetails = ({ id = '' }) => {
  return useQuery(['settings', 'current-pieces', id], () => axiosClient.get(`settings/current-pieces/${id}`).then((res) => res.data), {});
};

export const useGetSettingsCalendrierEmploiDetails = ({ id = '' }) => {
  return useQuery(
    ['settings', 'calendrier', 'list', 'emploi', id],
    () => axiosClient.get(`settings/calendrier/emploi/list/${id}`).then((res) => res.data),
    {}
  );
};

export const useGetSettingsCalendrierEmploiDetailsSingle = ({ id = '' }) => {
  return useQuery(
    ['settings', 'calendrier', 'emploi', id],
    () => axiosClient.get(`settings/calendrier/emploi/${id}`).then((res) => res.data),
    {}
  );
};

export const useGetCalendrierTypeDetails = () => {
  return useQuery(['settings', 'calendrier', 'type'], () => axiosClient.get(`settings/calendrier/type`).then((res) => res.data), {});
};

export function useUpdateSettingsCalendrierEmploiDetails() {
  return useMutation(
    async ({ id, values }) => {
      const res = await axiosClient.put(`settings/calendrier/emploi/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useUpdateSettingsCurrentPiecesDetails() {
  return useMutation(
    async ({ id, values }) => {
      const res = await axiosClient.put(`settings/current-pieces/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useUpdateSettingsPreferences() {
  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`settings/preferences/1`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}
export function useUpdateSettingsMailer() {
  return useMutation(
    async (values) => {
      const res = await axiosClient.put(`settings/mail`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export const useGetJoursFeries = ({ page = 1, searchFilter = '', paginated = true }) => {
  return useQuery(
    ['jours-feries', page, searchFilter],
    () =>
      axiosClient
        .get(`settings/jour-ferie?page=${page}&search=${searchFilter}&${paginated ? `paginated=${paginated}&` : ''}`)
        .then((res) => res.data),
    {}
  );
};

export const useGetJoursFeriesDetails = ({ id = '' }) => {
  return useQuery(['jours-feries', id], () => axiosClient.get(`settings/calendrier/parametrage/${id}`).then((res) => res.data), {});
};

export function useCreateJourFerie() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`settings/calendrier/parametrage`, values);
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

export function useUpdateJourFerie(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`settings/calendrier/parametrage/${id}?_method=PUT`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useDeleteJourFerie(id = '') {
  return useMutation(
    async () => {
      const res = await axiosClient.delete(`settings/calendrier/parametrage/${id}`);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export const useGetJoursFeriesChildren = ({ parentId = '', page = 1, searchFilter = '' }) => {
  return useQuery(
    ['jours-feries-children', parentId, page, searchFilter],
    () => axiosClient.get(`settings/jour-ferie/${parentId}/list?page=${page}&search=${searchFilter}`).then((res) => res.data),
    {}
  );
};

export const useGetJoursFeriesChild = ({ id = '' }) => {
  return useQuery(['jours-feries-child', id], () => axiosClient.get(`settings/jour-ferie/${id}`).then((res) => res.data), {});
};

export function useCreateJourFerieChild() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`settings/jour-ferie`, values);
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

export function useUpdateJourFerieChild(id = '') {
  return useMutation(
    async (values) => {
      const res = await axiosClient.post(`settings/jour-ferie/${id}?_method=PUT`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useDeleteJourFerieChild(id = '') {
  return useMutation(
    async () => {
      const res = await axiosClient.delete(`settings/jour-ferie/${id}`);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export const useGetDashboardStats = ({ inspectionFilterValue, totalInspectionsValue }) => {
  return useQuery(
    ['dashboard-stats', inspectionFilterValue, totalInspectionsValue],
    () =>
      axiosClient
        .get(
          `dashboard/stats?${inspectionFilterValue ? `role=${inspectionFilterValue}&` : ''}${
            totalInspectionsValue ? `date_inspection=${totalInspectionsValue}&` : ''
          }`
        )
        .then((res) => res.data),
    {}
  );
};

export const useGetSocieteSettings = () => {
  return useQuery(['societe-settings'], () => axiosClient.get(`settings/societe`).then((res) => res.data), {});
};

export const useGetSocieteSettingsById = ({ societeId }) => {
  return useQuery(['societe', societeId], () => axiosClient.get(`settings/societe/${societeId}`).then((res) => res.data), {});
};

export function useUpdateSociete() {
  return useMutation(
    async ({ id = '', values }) => {
      const res = await axiosClient.put(`settings/societe/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}

export function useDeleteSocieteMutation() {
  return useMutation(
    async ({ id = '', values }) => {
      const res = await axiosClient.delete(`settings/societe/${id}`, values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
      }
    }
  );
}
