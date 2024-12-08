import { Box, FormControl, FormLabel, Select } from '@chakra-ui/react';
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
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import { useQuery } from '@tanstack/react-query';
import districtsData from '../../../../../public/caobang_districts.json';


const fetchUsers = async (district: string) => {
  const params = { hometown: district === 'all' ? '' : district };
  const response = await axiosInstance.post(apiEndpoints.users, null, {
    params,
  });
  return response.data;
};

const PopulationPyramid = () => {
  const [districtsParams, setDistrictsParams] = useState([]);
  const [districtFilter, setDistrictFilter] = useState('all');

  const districts = districtsData.features.map((feature) => ({
    OBJECTID: feature.properties.OBJECTID,
    District: feature.properties.District,
  }));
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({ queryKey: ['users', districtFilter], queryFn:({ queryKey }) => fetchUsers(districtFilter)});
  console.log('datad', users);
  // Thêm dấu `-` vào trước giá trị `MALE`
  const newData = users && users?.data.map((item: any) => {
    if (item.MALE !== undefined) {
      item.MALE = -Math.abs(item.MALE); // Đảm bảo giá trị là số âm
    }
    return item;
  });
  console.log('datad2', districtFilter);

  return (
    <Box mb="5" w={'100%'}>
      {/* Bộ lọc */}


      <FormControl display="flex" alignItems="center" marginTop={2} marginBottom={2}>
        <FormLabel htmlFor="district-filter" mb="0">
          Xã/Huyện:
        </FormLabel>
        <Select
          id="district-filter"
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          ml="2"
          w="200px"
        >
          <option value="all">Tất cả</option>
          {districts.map((district) => (
              <option key={district.OBJECTID} value={district.OBJECTID}>
                {district.District}
              </option>
            ))}
        </Select>
      </FormControl>

      {/* Biểu đồ */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart layout="vertical" data={newData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[-50, 50]}
            tickFormatter={(value: number) => `${Math.abs(value)}%`}
          />
          <YAxis type="category" dataKey="AGE_GROUP" />
          <Tooltip formatter={(value: number) => `${Math.abs(value)}%`} />
          <Bar dataKey="MALE" fill="#4285F4" stackId="a" barSize={40}/>
          <Bar dataKey="FEMALE" fill="#AA46BE" stackId="c" barSize={40}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PopulationPyramid;
