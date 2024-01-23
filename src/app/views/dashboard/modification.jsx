import React, { Fragment } from 'react';
import { Card, Grid, styled, useTheme, Typography, Box } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import Header from './shared/Header';
import PieEdit from './Edits/PieEdit';
import TableEdit1 from './Edits/TableEdit1';
import TableEdit2 from './Edits/TableEdit2';
import DataTable from './shared/DataTable';

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
        ></Box>

        <Grid container spacing={1}>
          {/* Use Grid item with lg={6} to share the body 50/50 */}
          <Grid item lg={6} sm={12} xs={10} md={6}>
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
                <DataTable />
              </SimpleCard>
            </Card>
          </Grid>
          <Grid item lg={6} sm={12} xs={10} md={6}>
            <Card
              style={{
                marginBottom: '20px'
              }}
            >
              <Grid
                sx={{
                  backgroundColor: '#232A45',
                  padding: '10px'
                }}
              >
                <Typography color="white" variant="h6" gutterBottom align="left">
                  Inspections
                </Typography>
              </Grid>
              <TableEdit2
                height="430% ! important"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>
          </Grid>

          <Grid item lg={8} sm={12} xs={10} md={6}>
            <Card>
              <SimpleCard sx={{ borderRadius: '1px' }}>
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
                <TableEdit1 />
              </SimpleCard>
            </Card>
          </Grid>

          {/* Display PieEdit and TableEdit2 side by side */}

          <Grid item lg={4} sm={12} xs={10} md={6}>
            <Card>
              <Grid
                sx={{
                  backgroundColor: '#232A45',
                  padding: '10px'
                }}
              >
                <Typography color="white" variant="h6" gutterBottom align="left">
                  Rapports
                </Typography>
              </Grid>
              <PieEdit height={400} />
            </Card>
          </Grid>
        </Grid>
      </StyledCard>
    </Fragment>
  );
};

export default Analytics;
