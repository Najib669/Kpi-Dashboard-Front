import React from 'react';
import { Grid, Typography, styled, Card, Box } from '@mui/material';
import { Fragment } from 'react';
import { convertHexToRGB } from 'app/utils/utils';
import { SimpleCard } from 'app/components';
import LineCharts from './shared/LineCharts';
import ChargeFolder from './shared/ChargeFolder';
import Header from './shared/Header';
import AgentDatatable from './shared/StDatatable';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const Customtab = () => {
  return (
    <StyledCard>
      <Grid>
        <Box align="center"></Box>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={10} md={7}>
          <Card>
            <Grid
              sx={{
                backgroundColor: '#232A45',
                padding: '10px'
              }}
            >
              <Typography align="left" color="white" variant="h6" gutterBottom>
                Ligne de graphique
              </Typography>
            </Grid>
            <LineCharts />
          </Card>
        </Grid>
        <Grid item lg={5} md={5}>
          <Card>
            <Grid
              sx={{
                backgroundColor: '#232A45',
                padding: '10px'
              }}
            >
              <Typography align="left" color="white" variant="h6" gutterBottom>
                Dossiers des utilisateurs
              </Typography>
            </Grid>
            <ChargeFolder />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid
              sx={{
                backgroundColor: '#232A45',
                padding: '10px'
              }}
            >
              <Typography align="left" color="white" variant="h6" gutterBottom>
                Liste Des Dossiers
              </Typography>
            </Grid>
            <SimpleCard>
              <AgentDatatable />
            </SimpleCard>
          </Card>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default Customtab;
