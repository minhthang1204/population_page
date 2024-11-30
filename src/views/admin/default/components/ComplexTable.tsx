import { Box, Card, Flex, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';

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

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <FormControl display="flex" alignItems="center" mb="4">
        <FormLabel htmlFor="gender-filter" mb="0">
          Chọn:
        </FormLabel>
        <Select
          id="gender-filter"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          ml="2"
          w="200px"
        >
          <option value="all">Tất cả</option>
          <option value="male">Nam</option>
          {/* map data các huyện */}
        </Select>
      </FormControl>
      <Box>
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Độ tuổi kết hôn trung bình lần đầu
        </Text>
        <Text textAlign="center" mb={6} fontSize="sm">
          Đơn vị: tuổi
        </Text>
        <Flex justifyContent="center" mt={6}>
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
                />
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

export default ComplexTable;
