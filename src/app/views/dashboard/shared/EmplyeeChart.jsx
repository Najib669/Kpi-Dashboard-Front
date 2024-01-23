import React from 'react';
import {
  Grid,
  Card,
  styled,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Tooltip,
  IconButton
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

import { convertHexToRGB } from 'app/utils/utils';

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '10px !important' }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const employeesData = [];

const EmplyeeChart = () => {
  return (
    <Card eevationl={0}>
      <Card sx={{ borderRadius: '1px', marginLeft: '1px' }}>
        <Grid
          sx={{
            backgroundColor: '#232A45',
            padding: '10px',
            borderRadius: '1px'
          }}
        >
          <Typography color="white" variant="h6" gutterBottom>
            Top 5 des employés du mois{' '}
          </Typography>
        </Grid>
        <TableContainer>
          <Table sx={{ height: '400px !important' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Ingenieur</TableCell>
                <TableCell align="center">Nomber Dossier </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeesData.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar src={employee.avatar} alt={`Avatar - ${employee.name}`} />
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.score}%</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <ButtonGroup>
                        <IconButton color="primary" size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Card>
  );
};

export default EmplyeeChart;
