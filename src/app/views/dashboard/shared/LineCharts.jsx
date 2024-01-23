import { Card } from '@mui/material';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SimpleLineChart = () => {
  const data = [
    { month: 'Jan', nouveau: 30, modifiee: 20, audite: 35, enCours: 25 },
    { month: 'Feb', nouveau: 40, modifiee: 25, audite: 45, enCours: 30 },
    { month: 'Mar', nouveau: 25, modifiee: 35, audite: 30, enCours: 40 },
    { month: 'Apr', nouveau: 35, modifiee: 30, audite: 40, enCours: 35 },
    { month: 'May', nouveau: 50, modifiee: 40, audite: 50, enCours: 45 },
    { month: 'Jun', nouveau: 45, modifiee: 50, audite: 55, enCours: 55 },
    { month: 'Jul', nouveau: 40, modifiee: 25, audite: 45, enCours: 30 },
    { month: 'Aug', nouveau: 25, modifiee: 35, audite: 30, enCours: 40 },
    { month: 'Sep', nouveau: 35, modifiee: 30, audite: 40, enCours: 35 },
    { month: 'Oct', nouveau: 50, modifiee: 40, audite: 50, enCours: 45 },
    { month: 'Nov', nouveau: 45, modifiee: 50, audite: 55, enCours: 55 },
    { month: 'Dec', nouveau: 45, modifiee: 50, audite: 65, enCours: 55 }
  ];

  return (
    <Card item lg={8} sm={12} xs={10} md={6}>
      <ResponsiveContainer width="100%" height={470}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="nouveau" stroke="#8884d8" name="Nouveau" />
          <Line type="monotone" dataKey="modifiee" stroke="#82ca9d" name="Modifiée" />
          <Line type="monotone" dataKey="audite" stroke="#ffc658" name="Audité" />
          <Line type="monotone" dataKey="enCours" stroke="#ff7300" name="En Cours" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SimpleLineChart;
