import { Box, Text, VStack, HStack, Circle, Card } from '@chakra-ui/react';

const PopulationStats = () => {
  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      {/* <Box
        maxW="600px"
        mx="auto"
        p="6"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      > */}
        {/* Tiêu đề */}
        <Text fontSize="xl" fontWeight="bold" mb="2">
          Tổng dân số chia theo giới tính và thành thị nông thôn
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
          96.208.984
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
              47.881.061
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
              48.327.923
            </Text>
          </VStack>
        </HStack>

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
