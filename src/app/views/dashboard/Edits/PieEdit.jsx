// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { Card } from '@mui/material';

// const data = [
//   { id: 0, value: 10, label: 'In Progress', color: '#2196F3' },
//   { id: 1, value: 15, label: 'Completed', color: '#4CAF50' },
//   { id: 2, value: 20, label: 'Pending', color: '#FFC107' },
//   { id: 3, value: 5, label: 'Failed', color: '#FF5722' }
// ];

// export default function PieActiveArc() {
//   return (
//     <Card sx={{ height: '333px' }}>
//       <PieChart
//         sx={{
//           height: '300px',
//           display: 'flex',
//           justifyContent: 'flex-start',
//           alignItems: 'center',
//           margin: '20px'
//         }}
//         series={[
//           {
//             data,
//             highlightScope: { faded: 'global', highlighted: 'item' },
//             faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
//           }
//         ]}
//       />
//     </Card>
//   );
// }
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
    <Card sx={{ height: '333px' }}>
      <PieChart
        sx={{
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px'
        }}
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
