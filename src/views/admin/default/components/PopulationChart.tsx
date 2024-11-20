import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { age: '0-04', male: -6, female: 5 },
  { age: '05-09', male: -5.5, female: 5 },
  { age: '10-14', male: -5, female: 4.8 },
  { age: '15-19', male: -4.8, female: 4.7 },
  { age: '20-24', male: -5.2, female: 5.1 },
  { age: '25-29', male: -5.5, female: 5.3 },
  { age: '30-34', male: -4.9, female: 4.6 },
  { age: '35-39', male: -4.5, female: 4.3 },
  { age: '40-44', male: -4.1, female: 4.2 },
  { age: '45-49', male: -3.8, female: 3.7 },
  { age: '50-54', male: -3.4, female: 3.3 },
  { age: '55-59', male: -3, female: 2.9 },
  { age: '60-64', male: -2.6, female: 2.5 },
  { age: '65-69', male: -2.1, female: 2.2 },
  { age: '70-74', male: -1.7, female: 1.8 },
  { age: '75-79', male: -1.2, female: 1.3 },
  { age: '80+', male: -0.8, female: 1 },
];

const PopulationPyramid = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          domain={[-10, 10]}
          tickFormatter={(value: number) => `${Math.abs(value)}%`}
        />

        <YAxis type="category" dataKey="age" />
        <Tooltip formatter={(value: number) => `${Math.abs(value)}%`} />

        <Bar dataKey="male" fill="#4285F4" stackId="a" />
        <Bar dataKey="female" fill="#AA46BE" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PopulationPyramid;
