import { Box, Text, Flex, Icon, VStack, HStack, Card } from '@chakra-ui/react';
import { FaCity, FaGlobe, FaTractor, FaMale, FaFemale } from 'react-icons/fa';

export default function ComplexTable() {
  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Box p={5}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
          Tuổi kết hôn trung bình lần đầu
        </Text>
        <Text fontSize="sm" textAlign="right" mb={6}>
          Đơn vị: Tuổi
        </Text>

        {/* Section 1: Thành thị, Toàn quốc, Nông thôn */}
        <Flex justify="space-around" align="center" mb={10}>
          <VStack spacing={3}>
            <Icon as={FaCity} boxSize={10} color="yellow.400" />
            <Text fontWeight="bold">Thành thị</Text>
            <Box bg="yellow.100" px={4} py={2} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg">
                26,4
              </Text>
            </Box>
          </VStack>
          <VStack spacing={3}>
            <Icon as={FaGlobe} boxSize={10} color="purple.400" />
            <Text fontWeight="bold">Toàn quốc</Text>
            <Box bg="purple.100" px={4} py={2} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg">
                25,2
              </Text>
            </Box>
          </VStack>
          <VStack spacing={3}>
            <Icon as={FaTractor} boxSize={10} color="green.400" />
            <Text fontWeight="bold">Nông thôn</Text>
            <Box bg="green.100" px={4} py={2} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg">
                24,5
              </Text>
            </Box>
          </VStack>
        </Flex>

        {/* Section 2: Nam và Nữ */}
        <Flex justify="space-around" align="center">
          <VStack spacing={3}>
            <Icon as={FaMale} boxSize={10} color="blue.400" />
            <Text fontWeight="bold">Nam</Text>
            <Box bg="blue.100" px={4} py={2} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg">
                27,2
              </Text>
            </Box>
          </VStack>
          <VStack spacing={3}>
            <Icon as={FaFemale} boxSize={10} color="red.400" />
            <Text fontWeight="bold">Nữ</Text>
            <Box bg="red.100" px={4} py={2} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg">
                23,1
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Card>
  );
}
