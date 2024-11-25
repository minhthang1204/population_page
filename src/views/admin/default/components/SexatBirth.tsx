import { Box, Flex, Text, Image, VStack, HStack, Card } from '@chakra-ui/react';

export default function SexatBirth() {
  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <Box p={5} maxW="600px" mx="auto" borderWidth="1px" borderRadius="lg">
        {/* Tiêu đề */}
        <VStack spacing={3} textAlign="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold">
            Tỷ số giới tính khi sinh
          </Text>
          <Text fontSize="sm" color="gray.500">
            Đơn vị: Số bé trai/100 bé gái
          </Text>
        </VStack>

        {/* Hình ảnh em bé và chỉ số trung bình */}
        <Flex justifyContent="center" alignItems="center" mb={6}>
          <VStack spacing={1}>
            <Image
              src="/boy-icon.png" // Thay bằng link icon bé trai
              alt="Bé trai"
              boxSize="50px"
            />
            <Text color="teal.500" fontWeight="bold" fontSize="lg">
              ♂
            </Text>
          </VStack>
          <VStack mx={4}>
            <Text fontWeight="bold" fontSize="lg">
              Toàn quốc
            </Text>
            <Text fontSize="2xl" color="blue.500" fontWeight="bold">
              111,5
            </Text>
          </VStack>
          <VStack spacing={1}>
            <Image
              src="/girl-icon.png" // Thay bằng link icon bé gái
              alt="Bé gái"
              boxSize="50px"
            />
            <Text color="pink.500" fontWeight="bold" fontSize="lg">
              ♀
            </Text>
          </VStack>
        </Flex>

        {/* Thống kê theo khu vực */}
        <HStack justifyContent="space-between">
          <VStack align="center" spacing={1}>
            <Image
              src="/city-icon.png" // Thay bằng link icon thành thị
              alt="Thành thị"
              boxSize="60px"
            />
            <Text fontWeight="bold" fontSize="lg">
              Thành thị
            </Text>
            <Text fontSize="xl" color="red.500" fontWeight="bold">
              110,8
            </Text>
          </VStack>
          <VStack align="center" spacing={1}>
            <Image
              src="/rural-icon.png" // Thay bằng link icon nông thôn
              alt="Nông thôn"
              boxSize="60px"
            />
            <Text fontWeight="bold" fontSize="lg">
              Nông thôn
            </Text>
            <Text fontSize="xl" color="blue.500" fontWeight="bold">
              111,8
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Card>
  );
}
