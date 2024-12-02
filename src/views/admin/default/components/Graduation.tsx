import { Box, Card, Flex, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import { useState } from 'react';
import districtsData from '../../../../../public/caobang_districts.json';

const Graduation = () => {
  const [districtFilter, setDistrictFilter] = useState('all');
  // Dữ liệu biểu đồ
  const data = [
    { label: 'Toàn quốc', chung: 14.0, nam: 15.8, nu: 12.0 },
    { label: 'Thành thị', chung: 8.2, nam: 9.8, nu: 6.4 },
    { label: 'Nông thôn', chung: 16.7, nam: 18.9, nu: 14.4 },
  ];

  const districts = Array.from(
    new Set(districtsData.features.map((feature) => feature.properties.District))
  );
  // Màu sắc cho các nhóm
  const colors = { chung: 'blue.500', nam: 'green.500', nu: 'red.500' };

  const fetchUsers = async (district: string) => {
    const params = { hometown: district === 'all' ? '' : district };
    const response = await axiosInstance.get(apiEndpoints.login, {
      params,
    });
    return response.data;
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['usersStudy', districtFilter],
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

      <Box>
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
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </Select>
      </FormControl>
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Tỷ lệ dân số có trình độ học vấn theo cấp bậc
        </Text>
        <Text textAlign="center" mb={6} fontSize="sm">
          Đơn vị: %
        </Text>
        <Flex justifyContent="center" mt={6}>
          <Flex align="center" mx={2}>
            <Box width="20px" height="20px" bg={colors.chung} mr={2} />
            <Text fontSize="sm">Chung</Text>
          </Flex>
          <Flex align="center" mx={2}>
            <Box width="20px" height="20px" bg={colors.nam} mr={2} />
            <Text fontSize="sm">Nam</Text>
          </Flex>
          <Flex align="center" mx={2}>
            <Box width="20px" height="20px" bg={colors.nu} mr={2} />
            <Text fontSize="sm">Nữ</Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent="space-around"
          alignItems="flex-end"
          height="300px"
        >
          {data.map((item, index) => (
            <Flex
              key={index}
              flexDir="column"
              alignItems="flex-end"
              justifyContent="space-around"
            >
              <Flex alignItems="flex-end" justifyContent="flex-end" marginRight={12}>
                <Box
                  bg={colors.chung}
                  width="40px"
                  height={`${item.chung * 10}px`}
                  borderRadius="md"
                />
                {/* <Box
                  bg={colors.nam}
                  width="40px"
                  height={`${item.nam * 10}px`}
                  borderRadius="md"
                  mt={2}
                />
                <Box
                  bg={colors.nu}
                  width="40px"
                  height={`${item.nu * 10}px`}
                  borderRadius="md"
                  mt={2}
                /> */}
              </Flex>
              <Flex marginRight={12} alignSelf={'center'} justifySelf={'center'}>
                <Text mt={2} fontSize="sm" textAlign="center">
                  {item.label}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Card>
  );
};

export default Graduation;
