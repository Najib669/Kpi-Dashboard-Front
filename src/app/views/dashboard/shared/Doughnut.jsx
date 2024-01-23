import React from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

const DoughnutChart = ({ height, colors = [] }) => {
  const theme = useTheme();

  const option = {
    legend: {
      show: true,
      itemGap: 15,
      icon: 'circle',
      bottom: 0,
      top: 'bottom',
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    grid: {
      left: '20%',
      right: '20%',
      top: '20%',
      bottom: '20%',
      containLabel: true
    },
    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['43%', '77.55%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        hoverOffset: 10,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center',
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto'
            },
            formatter: '{a}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal'
            },
            formatter: '{b} \n{c} ({d}%)'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 65,
            name: 'Ingenieur',
            itemStyle: {
              color: colors[0] || theme.palette.primary.main,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          },
          // {
          //   value: 20,
          //   name: 'Dossiers Bientot Expirés',
          //   itemStyle: {
          //     color: colors[1] || theme.palette.secondary.main,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)',
          //     shadowBlur: 10
          //   }
          // },
          {
            value: 35,
            name: 'Client',
            itemStyle: {
              color: colors[2] || theme.palette.secondary.main,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          }
        ]
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...colors]
      }}
    />
  );
};

export default DoughnutChart;
