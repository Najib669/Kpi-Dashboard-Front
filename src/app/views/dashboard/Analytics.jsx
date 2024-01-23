import React, { Fragment } from 'react';
import { Card, Grid, styled, useTheme, Typography, Box } from '@mui/material';
import DataTable from './shared/DataTable';
import DoughnutChart from './shared/Doughnut';
import TableEdit3 from './Edits/TableEdit3';
import { convertHexToRGB } from 'app/utils/utils';
import WorkChart from './shared/WorkChart';
import Header from './shared/Header';
import PieActiveArc from './shared/PieActiveArc';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const SimpleCard = styled(Card)(({ theme }) => ({
  height: '100%'
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <StyledCard color="dark">
        <Box
          style={{
            marginLeft: '1%'
          }}
        >
          <Header title="TABLEAU DE BORD" subtitle="Bienvenue sur votre tableau de bord" />
        </Box>

        <Grid container spacing={1}>
          <Grid item lg={8} sm={12} xs={10} md={8}>
            <Card
              style={{
                marginBottom: '20px'
              }}
            >
              <SimpleCard sx={{ borderRadius: '1px' }}>
                <Grid
                  sx={{
                    backgroundColor: '#232A45',
                    padding: '10px'
                  }}
                >
                  <Typography align="left" color="white" variant="h6" gutterBottom>
                    Tableau de données
                  </Typography>
                </Grid>
                <TableEdit3 />
              </SimpleCard>
            </Card>
            <Card>
              <SimpleCard sx={{ borderRadius: '1px' }} item lg={8} sm={12} xs={10} md={8}>
                <Grid
                  sx={{
                    backgroundColor: '#232A45',
                    padding: '10px'
                  }}
                >
                  <Typography align="left" color="white" variant="h6" gutterBottom>
                    Statistique
                  </Typography>
                </Grid>
                <WorkChart />
              </SimpleCard>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              style={{
                marginBottom: '20px'
              }}
            >
              <Card>
                <Grid
                  sx={{
                    backgroundColor: '#232A45',
                    padding: '10px'
                  }}
                >
                  <Typography color="white" variant="h6" gutterBottom>
                    Sources de trafic{' '}
                  </Typography>
                </Grid>
                <SubTitle>30 derniers jours</SubTitle>
                <DoughnutChart
                  height="400%"
                  color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                />
              </Card>
            </Card>
            <Card>
              <Grid
                sx={{
                  backgroundColor: '#232A45',
                  padding: '10px'
                }}
              >
                <Typography color="white" variant="h6" gutterBottom>
                  Rapports
                </Typography>
              </Grid>
              <PieActiveArc height={400} /> {/* Set a fixed height, you can adjust this value */}
            </Card>
          </Grid>
        </Grid>
      </StyledCard>
    </Fragment>
  );
};

export default Analytics;
