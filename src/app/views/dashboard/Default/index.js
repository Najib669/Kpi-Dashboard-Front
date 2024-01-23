import React, { useEffect, useState } from 'react';

// material-ui
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import TaskIcon from '@mui/icons-material/Task';
// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useGetDashboardStats } from 'services/settings.service';
import InspectionsList from 'views/crm/inspections';
import InspectionsBarChart from 'views/crm/clients/list/charts/InspectionsBarChart';
import { format } from 'date-fns';
import MainCard from 'ui-component/cards/MainCard';
import {
  IconClipboard,
  IconClipboardCheck,
  IconClipboardData,
  IconClipboardOff
} from '@tabler/icons';
import RevenueCard from 'ui-component/cards/RevenueCard';
import FoundationIcon from '@mui/icons-material/Foundation';
import LatestInspectionsTableCard from './LatestInspectionsTableCard';
import RapportPieChartCard from './RapportPieChartCard';
import UserCountCard from 'ui-component/cards/UserCountCard';
import CustomerSatisfactionCard from 'views/widget/Statistics/CustomerSatisfactionCard';
import useAuth from 'hooks/useAuth';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {
  useGetInterventionstoday,
  useGetInterventionsPercentage,
  useGetInterventionsStates,
  useGetInterventionsByState,
  useGetInterventionstodayCountByState,
  useGetInterventionsYear
} from 'services/stats.service';
import { useGetInterventions } from 'services/interventions.service';
import { useGetInterventionstodayCount } from 'services/stats.service';
import { useNavigate } from 'react-router-dom';
import SatisfactionChartCard from './SatisfactionChartCard';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import SeoChartCard from './SeoChartCard';
import { Box } from '@mui/system';
import InterventionsList from './InterventionsList';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const blockSX = {
    p: 2.5,
    borderLeft: '1px solid ',
    borderBottom: '1px solid ',
    borderLeftColor:
      theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
    borderBottomColor:
      theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const { logout, user } = useAuth();
  const [totalInspectionsValue, setTotalInspectionsFilterValue] = React.useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const [inspectionFilterValue, setInspectionFilterValue] = React.useState('client');
  // const dashboardStatsQuery = useGetDashboardStats({ inspectionFilterValue, totalInspectionsValue });
  const getInterventionsToday = useGetInterventionstoday();
  const getInterventionsPourcentage = useGetInterventionsPercentage();
  const statesList = useGetInterventionsStates();
  const interventionsByState = useGetInterventionsByState({ status: 1 });

  const entitledStatesValues = statesList.isSuccess
    ? statesList.data.map((item) => item.entitled)
    : [];
  const idStatesValues = statesList.isSuccess ? statesList.data.map((item) => item.id) : [];

  const GetInterventionsTodayCount = useGetInterventionstodayCount();
  const dataAffecte = useGetInterventionstodayCountByState(1);
  const dataEnCours = useGetInterventionstodayCountByState(2);
  const dataTerminer = useGetInterventionstodayCountByState(3);
  const dataAnnuler = useGetInterventionstodayCountByState(4);
  const chartInterventionsData = useGetInterventionsYear();
  const navigate = useNavigate();

  const handleViewAllProjects = () => {
    navigate('/interventions/list');
  };

  const chartData = {
    height: 300,
    type: 'pie',
    options: {
      chart: {
        id: 'satisfaction-chart'
      },
      labels: getInterventionsPourcentage?.data?.techniciens,
      legend: {
        show: true,
        position: 'bottom',
        fontFamily: 'inherit',
        labels: {
          colors: 'inherit'
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false
        }
      },
      theme: {
        monochrome: {
          enabled: true
        }
      }
    },
    series: getInterventionsPourcentage?.data?.series
  };

  const processedChartData = {
    series: [
      {
        data: chartInterventionsData.isSuccess ? Object.values(chartInterventionsData.data) : []
      }
    ],
    options: {
      xaxis: {
        categories: chartInterventionsData.isSuccess ? Object.keys(chartInterventionsData.data) : []
      }
    }
  };
  return (
    <Grid container alignItems="stretch" spacing={gridSpacing}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {chartInterventionsData.isSuccess && (
              <Grid item xs={12}>
                <SeoChartCard
                  type={1}
                  chartData={processedChartData}
                  title="Nombre d'interventions"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid container spacing={3.5}>
          <Grid item xs={12}>
            {GetInterventionsTodayCount && (
              <Grid item xs={12} container spacing={3.5}>
                <Grid item xs={12}>
                  <UserCountCard
                    primary="Intervention Aujourd'hui"
                    secondary={GetInterventionsTodayCount?.data?.count}
                    iconPrimary={DescriptionTwoToneIcon}
                    color={theme.palette.primary.main}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MainCard
                    content={false}
                    sx={{
                      '& svg': {
                        width: 50,
                        height: 50,
                        color: theme.palette.secondary.main,
                        borderRadius: '14px',
                        p: 1.25,
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? theme.palette.background.default
                            : 'primary.light'
                      }
                    }}
                  >
                    <Grid container alignItems="center" spacing={0}>
                      <Grid item xs={12} sm={6} sx={blockSX}>
                        <Grid
                          container
                          alignItems="center"
                          spacing={1}
                          justifyContent={matchDownXs ? 'space-between' : 'center'}
                        >
                          <Grid item>
                            <IconClipboard stroke={1.5} />
                          </Grid>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="h5" align="center">
                              {dataAffecte?.data?.count}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              Affecté
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={blockSX}>
                        <Grid
                          container
                          alignItems="center"
                          spacing={1}
                          justifyContent={matchDownXs ? 'space-between' : 'center'}
                        >
                          <Grid item>
                            <IconClipboardData stroke={1.5} />
                          </Grid>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="h5" align="center">
                              {dataEnCours?.data?.count}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              En Cours
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={0}>
                      <Grid item xs={12} sm={6} sx={blockSX}>
                        <Grid
                          container
                          alignItems="center"
                          spacing={1}
                          justifyContent={matchDownXs ? 'space-between' : 'center'}
                        >
                          <Grid item>
                            <IconClipboardCheck stroke={1.5} />
                          </Grid>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="h5" align="center">
                              {dataTerminer?.data?.count}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              Terminer
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={blockSX}>
                        <Grid
                          container
                          alignItems="center"
                          spacing={1}
                          justifyContent={matchDownXs ? 'space-between' : 'center'}
                        >
                          <Grid item>
                            <IconClipboardOff stroke={1.5} />
                          </Grid>
                          <Grid item sm zeroMinWidth>
                            <Typography variant="h5" align="center">
                              {dataAnnuler?.data?.count}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                              Annuler
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            {statesList.isSuccess && (
              <>
                <SatisfactionChartCard
                  title={'Répartitions des Interventions par Technicien'}
                  chartData={chartData}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MainCard>
          <CardContent sx={{ p: 0 }}>
            <InterventionsList />
          </CardContent>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
