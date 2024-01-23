import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import * as React from 'react';

// material-ui
import { Box, Fab, Grid, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import AddIcon from '@mui/icons-material/AddTwoTone';
import {
  DataGrid,
  frFR,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { useGetClient } from 'services/clients.service';
import { useGetUser } from 'services/users.service';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { useGetInterventionstoday } from 'services/stats.service';
import { AssessmentOutlined, AssignmentLateOutlined } from '@mui/icons-material';
const InterventionsList = () => {
  const [page, setPage] = React.useState(1);
  const [searchFilter, setSearchFilter] = React.useState('');

  const getInterventionsQuery = useGetInterventionstoday();

  const navigate = useNavigate();

  return (
    <>
      <h3>Liste des Interventions d'aujourd'hui</h3>
      <TableDataGrid getInterventionsQuery={getInterventionsQuery} />
    </>
  );
};

export default InterventionsList;

function EditCell({ params }) {
  const navigate = useNavigate();
  return (
    <div>
      <IconButton
        color="secondary"
        size="large"
        onClick={(e) => {
          navigate(`/interventions/${params?.row?.id}/details`);
        }}
      >
        <VisibilityRoundedIcon sx={{ fontSize: '1.3rem' }} />
      </IconButton>
    </div>
  );
}

function TableDataGrid({ setSearchFilter, getInterventionsQuery, setPage }) {
  const theme = useTheme();
  const columns = [
    {
      field: 'status',
      headerName: 'Statut',
      sortable: false,
      hideable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => {
        const statusId = params?.row?.p_status_id;
        let iconComponent;

        switch (statusId) {
          case 1:
            iconComponent = (
              <AssessmentOutlined
                sx={{
                  color: '#f1c40f'
                }}
              />
            );
            break;
          case 2:
            iconComponent = (
              <PendingActionsOutlinedIcon
                sx={{
                  color: '#FF7900'
                }}
              />
            );
            break;
          case 3:
            iconComponent = (
              <AssignmentTurnedInOutlinedIcon
                sx={{
                  color: '#16a34a'
                }}
              />
            );
            break;
          case 4:
            iconComponent = (
              <AssignmentLateOutlined
                sx={{
                  color: '#F70000'
                }}
              />
            );
            break;
          default:
            iconComponent = null;
        }

        return iconComponent;
      }
    },
    { field: 'reference', headerName: 'Référence', sortable: false, filterable: false, minWidth: 100, flex: 1 },
    {
      field: 'd_client_id',
      headerName: 'Client',
      sortable: false,
      filterable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const clientId = params.value;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const getClientQuery = useGetClient(clientId);
        if (getClientQuery.isLoading) {
          return <>Loading...</>;
        }
        if (getClientQuery.isError || !getClientQuery.data) {
          return <>Error</>;
        }
        const client = getClientQuery.data;
        const entitled = client.entitled;
        return <>{entitled}</>;
      }
    },
    {
      field: 'user_id',
      headerName: 'Technicien',
      sortable: false,
      filterable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const userId = params.value;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const getUserQuery = useGetUser(userId);
        if (getUserQuery.isLoading) {
          return <>Loading...</>;
        }
        if (getUserQuery.isError || !getUserQuery.data) {
          return <>Error</>;
        }
        const user = getUserQuery.data;
        const name = user.name;
        return <>{name}</>;
      }
    },
    {
      field: 'object',
      headerName: 'Objet',
      sortable: false,
      filterable: false,
      minWidth: 100,
      flex: 1
    },
    { field: 'planned_start', headerName: 'Date début prévue', sortable: false, filterable: false, minWidth: 100, flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      hideable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => {
        return <EditCell params={params} />;
      }
    }
  ];

  let gridDataReverse = [];

  if (Array.isArray(getInterventionsQuery.data)) {
    gridDataReverse = getInterventionsQuery.isSuccess ? getInterventionsQuery.data?.slice().reverse() : [];
  }
  return (
    <Box
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        height: 400,
        '& .MuiDataGrid-root': {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          },
          '& .MuiDataGrid-columnsContainer': {
            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          },
          '& .MuiDataGrid-columnSeparator': {
            color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
          }
        }
      }}
    >
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        density="compact"
        rows={gridDataReverse || []}
        columns={columns}
        loading={getInterventionsQuery.isLoading || getInterventionsQuery.isFetching}
      />
    </Box>
  );
}
