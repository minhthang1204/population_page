import {
  Box,
  Text,
  VStack,
  HStack,
  Circle,
  Card,
  FormControl,
  FormLabel,
  Select,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import districtsData from '../../../../../public/caobang_districts.json';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import { useQuery } from '@tanstack/react-query';

const PopulationStats = () => {
  const [districtFilter, setDistrictFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  const districts = districtsData.features.map((feature) => ({
    OBJECTID: feature.properties.OBJECTID,
    District: feature.properties.District,
  }));

  const fetchUsers = async (district: string) => {
    const params = {
      gender: genderFilter === 'all' ? '' : genderFilter,
      hometown: district === 'all' ? '' : district,
    };
    const response = await axiosInstance.post(apiEndpoints.getByGender, null, {
      params,
    });
    return response.data;
  };
  const fetchUsersAll = async (district: string) => {
    const params = {
      gender: '',
      hometown: '',
    };
    const response = await axiosInstance.post(apiEndpoints.getByGender, null, {
      params,
    });
    return response.data;
  };
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['usersGender', districtFilter],
    queryFn: ({ queryKey }) => fetchUsersAll(districtFilter),
  });
  const { data: usersDistrict } = useQuery({
    queryKey: ['usersGenderDistrict', districtFilter],
    queryFn: ({ queryKey }) => fetchUsers(districtFilter),
  });

  const fontSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });
  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="flex-start"
      // justifyContent="center"
      paddingLeft={6}
      borderRadius={20}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px" w="100%" marginTop={6}>
        <Flex
          align="center"
          w="100%"
          justify={{ base: 'center', xl: 'center' }}
          borderBottom={'1px'}
          borderBottomColor={'#07a6f0'}
          paddingBottom={10}
        >
          <Text fontSize={fontSize} color={'#07a6f0'}>
            TỔNG DÂN SỐ CHIA THEO GIỚI TÍNH
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent={'space-between'} marginBottom={8}>
        <FormControl display="flex" alignItems="center" marginRight={10} marginTop={2} marginBottom={2}>
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
      </Flex>
      {/* <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="district-filter" mb="0">
            Giới tính:
          </FormLabel>
          <Select
            id="district-filter"
            value={districtFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            ml="2"
            w="200px"
          >
            <option value="all">Tất cả</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </Select>
        </FormControl> */}

      {/* Tiêu đề */}
      <Flex justifyContent={'space-around'} alignItems={'center'} width={'100%'} marginBottom={2}>
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontSize="xl" fontWeight="bold" mb="2">
            HUYỆN
          </Text>
          <Text fontSize="sm" color="gray.500">
            Đơn vị: Người
          </Text>

          {/* Tổng dân số */}
          <Box
            bg="green.200"
            color="green.800"
            py="2"
            my="4"
            fontSize="2xl"
            fontWeight="bold"
            borderRadius="md"
          >
            {usersDistrict?.data?.all}
          </Box>

          <Text fontSize="sm" color="gray.500" mb="6">
            Dân số thời điểm 0h ngày 01/4/2019
          </Text>

          {/* Số liệu chi tiết */}
          <HStack spacing="8" justify="center">
            <VStack>
              <Circle size="50px" bg="blue.100">
                <Text fontSize="2xl" color="blue.600">
                  👨
                </Text>
              </Circle>
              <Text fontWeight="bold">Nam</Text>
              <Text fontSize="lg" fontWeight="bold">
                {usersDistrict?.data?.male}
              </Text>
            </VStack>

            <VStack>
              <Circle size="50px" bg="pink.100">
                <Text fontSize="2xl" color="pink.600">
                  👩
                </Text>
              </Circle>
              <Text fontWeight="bold">Nữ</Text>
              <Text fontSize="lg" fontWeight="bold">
                {usersDistrict?.data?.female}
              </Text>
            </VStack>
          </HStack>
        </Flex>
        <Flex marginLeft={12} flexDirection={'column'} alignItems={'center'}>
          <Text fontSize="xl" fontWeight="bold" mb="2">
           TỈNH
          </Text>
          <Text fontSize="sm" color="gray.500">
            Đơn vị: Người
          </Text>

          {/* Tổng dân số */}
          <Box
            bg="green.200"
            color="green.800"
            py="2"
            my="4"
            fontSize="2xl"
            fontWeight="bold"
            borderRadius="md"
          >
            {users?.data?.all}
          </Box>

          <Text fontSize="sm" color="gray.500" mb="6">
            Dân số thời điểm 0h ngày 01/4/2019
          </Text>

          {/* Số liệu chi tiết */}
          <HStack spacing="8" justify="center">
            <VStack>
              <Circle size="50px" bg="blue.100">
                <Text fontSize="2xl" color="blue.600">
                  👨
                </Text>
              </Circle>
              <Text fontWeight="bold">Nam</Text>
              <Text fontSize="lg" fontWeight="bold">
                {users?.data?.male}
              </Text>
            </VStack>

            <VStack>
              <Circle size="50px" bg="pink.100">
                <Text fontSize="2xl" color="pink.600">
                  👩
                </Text>
              </Circle>
              <Text fontWeight="bold">Nữ</Text>
              <Text fontSize="lg" fontWeight="bold">
                {users?.data?.female}
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </Flex>
      {/* <HStack spacing="8" justify="center" mt="6">
        <VStack>
          <Circle size="50px" bg="blue.200">
            <Text fontSize="2xl" color="blue.700">🏙️</Text>
          </Circle>
          <Text fontWeight="bold">Thành thị</Text>
          <Text fontSize="lg" fontWeight="bold">33.122.548</Text>
        </VStack>
        
        <VStack>
          <Circle size="50px" bg="green.200">
            <Text fontSize="2xl" color="green.700">🌾</Text>
          </Circle>
          <Text fontWeight="bold">Nông thôn</Text>
          <Text fontSize="lg" fontWeight="bold">63.086.436</Text>
        </VStack>
      </HStack> */}
      {/* </Box> */}
    </Card>
  );
};

export default PopulationStats;
