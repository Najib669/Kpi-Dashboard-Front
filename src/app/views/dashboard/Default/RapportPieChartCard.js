import PropTypes from 'prop-types';

// material-ui
import { Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// =========================|| SATISFACTION CHART CARD ||========================= //

const RapportPieChartCard = ({ chartData, title }) => (
  <MainCard title={title}>
    <Grid container direction="column" spacing={1}>
      {/* <Grid item>
        <Typography variant="subtitle1">{title || 'Customer Satisfaction'}</Typography>
      </Grid> */}
      <Grid item>
        <Chart {...chartData} />
      </Grid>
    </Grid>
  </MainCard>
);

RapportPieChartCard.propTypes = {
  chartData: PropTypes.object
};

export default RapportPieChartCard;
