import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, title, data }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false} title={title}>
          <CardContent>
            <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>
              <Grid container spacing={gridSpacing}>
                {/* <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">{title || 'Popular Stocks'}</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}>Today</MenuItem>
                      <MenuItem onClick={handleClose}>This Month</MenuItem>
                      <MenuItem onClick={handleClose}>This Year</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid> */}
                {/* <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid> */}
                <Grid
                  item
                  xs={12}
                  style={{
                    height: 280
                  }}
                >
                  {data &&
                    data?.map((e) => (
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {e?.rapport_chemin}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid container alignItems="center" justifyContent="space-between">
                                {/* <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  $1839.00
                                </Typography>
                              </Grid> */}
                                <Grid item>
                                  <a
                                    style={{
                                      textDecoration: 'none',
                                      color: 'inherit'
                                    }}
                                    href={`${process.env.REACT_APP_API_URL}rapports/${e?.id}/download-pdf`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <IconButton color="secondary" size="large" onClick={(e) => {}}>
                                      <FileDownloadIcon sx={{ fontSize: '1.3rem' }} />
                                    </IconButton>
                                    {/* <Button size="small" variant="outlined" startIcon={<DownloadIcon />}>
                Télécharger comme PDF
              </Button> */}
                                  </a>
                                  {/* <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    backgroundColor: theme.palette.success.light,
                                    color: theme.palette.success.dark,
                                    ml: 2
                                  }}
                                >
                                  <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                </Avatar> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">{e?.technicien?.name}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
              </Grid>
            </PerfectScrollbar>
          </CardContent>
          {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
