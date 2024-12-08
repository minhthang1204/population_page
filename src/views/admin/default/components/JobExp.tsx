import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import districtsData from '../../../../../public/caobang_districts.json';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';

const JobExp = () => {
  // Dữ liệu biểu đồ
  const [districtFilter, setDistrictFilter] = useState('all');

  const fetchUsers = async (district: string) => {
    const params = { hometown: district === 'all' ? '' : district };
    const response = await axiosInstance.get(apiEndpoints.jobExp, {
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
    queryKey: ['usersJob', districtFilter],
    queryFn: ({ queryKey }) => fetchUsers(districtFilter),
  });

  // Màu sắc cho các nhóm
  const colors = { chung: 'blue.500', nam: 'green.500', nu: 'red.500' };
  const fontSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });

  const renderColumn = (data: number) => {
    if (data > 80) return data * 3.5
    if (data > 60) return data * 4.5
    if (data > 40) return data * 6
    if (data > 20) return data * 9
    if (data > 10) return data * 13
    if (data > 2) return data * 16
    return data
  }

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      // justifyContent="center"
      paddingLeft={6}
      borderRadius={20}
    >
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pt="5px"
        w="100%"
        marginTop={6}
      >
        <Flex
          align="center"
          w="100%"
          justify={{ base: 'center', xl: 'center' }}
          borderBottom={'1px'}
          borderBottomColor={'#07a6f0'}
          paddingBottom={2}
        >
          <Text fontSize={fontSize} color={'#07a6f0'}>
            TỶ LỆ NGƯỜI TRÊN 18 ĐÃ ĐI LÀM 
          </Text>
        </Flex>
      </Flex>
      <FormControl display="flex" alignItems="center"  marginTop={6} marginBottom={6}>
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
        {/* <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Tỷ lệ nguời trên 18 đã đi làm
        </Text> */}
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
          {/* {data.map((item, index) => ( */}
          <Flex
            key={'male'}
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
                  height={`${renderColumn(users?.data.all)}px`}
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
                  height={`${renderColumn(users?.data.male)}px`}
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
                  height={`${renderColumn(users?.data.female)}px`}
                  borderRadius="md"
                  mt={2}
                />
              </Tooltip>
            </Flex>
            <Flex marginRight={12} marginBottom={8} alignSelf={'center'} justifySelf={'center'}>
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

export default JobExp;
