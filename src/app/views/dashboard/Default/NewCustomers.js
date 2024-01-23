import PropTypes from 'prop-types';

// material-ui
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import Avatar4 from 'assets/images/users/avatar-4.png';
import Avatar5 from 'assets/images/users/avatar-5.png';

import { useGetUsers } from 'services/users.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const activeSX = {
  width: 16,
  height: 16,
  verticalAlign: 'sub',
  color: 'success.main'
};

const iconSX = {
  fontSize: '0.875rem',
  mr: 0.25,
  verticalAlign: 'sub'
};

// ===========================|| DATA WIDGET - NEW CUSTOMERS CARD ||=========================== //

const NewCustomers = ({ title }) => {
  const navigate = useNavigate();

  const handleViewAllProjects = () => {
    navigate('/techniciens/list');
  };
  const techList = useGetUsers();
  return (
    <MainCard title={title} content={false}>
      <PerfectScrollbar style={{ height: 360 }}>
        <CardContent>
          <Grid container spacing={gridSpacing} alignItems="center">
            {techList.isSuccess && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {techList.isSuccess && (
                    <Grid item xs={12}>
                      {techList.data.map((item, index) => (
                        <Grid container spacing={2} key={index}>
                          <React.Fragment>
                            <Grid item>{/* <Avatar alt="coverimage" src={item.avatar} /> */}</Grid>
                            <Grid item xs zeroMinWidth>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs zeroMinWidth>
                                  <Typography align="left" component="div" variant="h4">
                                    {item.name}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography align="left" component="div" variant="caption">
                                    <FiberManualRecordIcon sx={{ ...activeSX, color: item.color }} />
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs zeroMinWidth>
                                  <Typography align="left" component="div" variant="subtitle2">
                                    {item.email}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Divider sx={{ my: 1 }} />
                            </Grid>
                          </React.Fragment>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </PerfectScrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" size="small" onClick={handleViewAllProjects}>
          Voir Tous
        </Button>
      </CardActions>
    </MainCard>
  );
};

NewCustomers.propTypes = {
  title: PropTypes.string
};

export default NewCustomers;
