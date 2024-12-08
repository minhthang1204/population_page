import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import districtsData from '../../../../../public/caobang_districts.json';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';

const InfantMortalityRate = () => {
  // Dữ liệu biểu đồ
  const data = [
    { label: 'Toàn quốc', chung: 14.0, nam: 15.8, nu: 12.0 },
    { label: 'Thành thị', chung: 8.2, nam: 9.8, nu: 6.4 },
    { label: 'Nông thôn', chung: 16.7, nam: 18.9, nu: 14.4 },
  ];
  const [districtFilter, setDistrictFilter] = useState('all');

  const fetchUsers = async (district: string) => {
    const params = { hometown: district === 'all' ? '' : district };
    const response = await axiosInstance.get(apiEndpoints.peopleDie, {
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
    queryKey: ['usersDeath', districtFilter],
    queryFn: ({ queryKey }) => fetchUsers(districtFilter),
  });

  // Màu sắc cho các nhóm
  const colors = { chung: 'blue.500', nam: 'green.500', nu: 'red.500' };

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="flex-start"
    >
      <FormControl display="flex" alignItems="center" marginBottom={6} marginTop={6} marginLeft={16}>
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
      <Box>
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Tỷ suất chết trẻ em dưới 1 tuổi (IMR)
        </Text>
        <Text textAlign="center" mb={6} fontSize="sm">
          Đơn vị: Trẻ em dưới 1 tuổi tử vong trên 1000 trẻ sinh sống
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
          {/* {data.map((item, index) => ( */}
          <Flex
            // key={index}
            flexDir="column"
            alignItems="flex-end"
            justifyContent="space-around"
          >
            <Flex
              alignItems="flex-end"
              justifyContent="flex-end"
              marginRight={12}
            >
              <Tooltip
                label={`${users?.data.all}`}
                aria-label="Percentage Tooltip"
              >
                <Box
                  bg={colors.chung}
                  width="40px"
                  height={`${users?.data.all}px`}
                  borderRadius="md"
                />
              </Tooltip>
              <Tooltip
                label={`${users?.data.male}`}
                aria-label="Percentage Tooltip"
              >
                <Box
                  bg={colors.nam}
                  width="40px"
                  height={`${users?.data.male}px`}
                  borderRadius="md"
                  mt={2}
                />
              </Tooltip>
              <Tooltip
                label={`${users?.data.female}`}
                aria-label="Percentage Tooltip"
              >
                <Box
                  bg={colors.nu}
                  width="40px"
                  height={`${users?.data.female}px`}
                  borderRadius="md"
                  mt={2}
                />
              </Tooltip>
            </Flex>
            <Flex marginRight={12} alignSelf={'center'} justifySelf={'center'}>
              <Text mt={2} fontSize="sm" textAlign="center">
                {/* {users?.data?.} */}
              </Text>
            </Flex>
          </Flex>
          {/* ))} */}
        </Flex>
      </Box>
    </Card>
  );
};

export default InfantMortalityRate;
