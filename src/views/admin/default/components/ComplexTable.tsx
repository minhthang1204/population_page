import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import districtsData from '../../../../../public/caobang_districts.json';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';

const ComplexTable = () => {
  const [genderFilter, setGenderFilter] = useState('all');
  // Dữ liệu biểu đồ
  const data = [
    { label: 'Toàn quốc', chung: 14.0, nam: 15.8, nu: 12.0 },
    { label: 'Thành thị', chung: 8.2, nam: 9.8, nu: 6.4 },
    { label: 'Nông thôn', chung: 16.7, nam: 18.9, nu: 14.4 },
  ];

  // Màu sắc cho các nhóm
  const colors = { chung: 'blue.500', nam: 'green.500', nu: 'red.500' };

  const [districtFilter, setDistrictFilter] = useState('all');

  const fetchUsers = async (district: string) => {
    const params = { hometown: district === 'all' ? '' : district };
    const response = await axiosInstance.get(apiEndpoints.firstMarried, {
      params,
    });
    return response.data;
  };

  const districts = districtsData.features.map((feature) => ({
    OBJECTID: feature.properties.OBJECTID,
    District: feature.properties.District,
  }));
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['usersMarriages', districtFilter],
    queryFn: ({ queryKey }) => fetchUsers(districtFilter),
  });

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <FormControl display="flex" alignItems="center">
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
      <VStack spacing={3} textAlign="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Tỉ lệ kết hôn trung bình
        </Text>
        <Text fontSize="sm" color="gray.500">
          Đơn vị: tuổi
        </Text>
      </VStack>

      {/* Hình ảnh em bé và chỉ số trung bình */}
      <Flex justifyContent="center" alignItems="center" mb={6}>
        <VStack spacing={1}>
          <Image
            src="/img/boy-icon.png" // Thay bằng link icon bé trai
            alt="Bé trai"
            boxSize="50px"
          />
          <Text color="teal.500" fontWeight="bold" fontSize="lg">
          {users?.data.male}
          </Text>
        </VStack>
        <VStack mx={4}>
          <Text fontWeight="bold" fontSize="lg">
            Tất cả
          </Text>
          <Text fontSize="2xl" color="blue.500" fontWeight="bold">
            {users?.data.allAge}
          </Text>
        </VStack>
        <VStack spacing={1}>
          <Image
            src="/img/girl-icon.png" // Thay bằng link icon bé gái
            alt="Bé gái"
            boxSize="50px"
          />
          <Text color="pink.500" fontWeight="bold" fontSize="lg">
          {users?.data.female}
          </Text>
        </VStack>
      </Flex>
    </Card>
  );
};

export default ComplexTable;
