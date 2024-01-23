import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card } from '@mui/material';

const data = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' }

];

export default function PieActiveArc() {
  return (
    <Card >
        <PieChart sx={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
            }
          ]}
          height={300}
        />
    </Card>
  );
}
