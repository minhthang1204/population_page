import React, { useState } from 'react';
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
  const [genderFilter, setGenderFilter] = useState('all'); // Lọc giới tính
  const [districtFilter, setDistrictFilter] = useState('all'); // Lọc xã/huyện

  // Lọc dữ liệu theo bộ lọc
  const filteredData = data.filter((item) => {
    const genderMatch =
      genderFilter === 'all' ||
      (genderFilter === 'male' && item.male < 0) ||
      (genderFilter === 'female' && item.female > 0);
    const districtMatch =
      districtFilter === 'all' || item?.district === districtFilter;
    return genderMatch && districtMatch;
  });

  return (
    <div>
      {/* Bộ lọc */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Giới tính:
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="all">Tất cả</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          Xã/Huyện:
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="all">Tất cả</option>
            <option value="A">Xã/Huyện A</option>
            <option value="B">Xã/Huyện B</option>
            <option value="C">Xã/Huyện C</option>
          </select>
        </label>
      </div>

      {/* Biểu đồ */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart layout="vertical" data={filteredData}>
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
    </div>
  );
};

export default PopulationPyramid;
