import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  Card,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import Slider from 'react-slick';

export default function SexatBirth() {
  const fetchUsers = async () => {
    const response = await axiosInstance.get(apiEndpoints.genderAtBirth);
    return response.data;
  };
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['usersBirth'],
    queryFn: ({ queryKey }) => fetchUsers(),
  });
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false, // Tắt chế độ dọc
    verticalSwiping: false, // Tắt vuốt dọc
    swipeToSlide: true, // Vuốt để trượt
  };
  const fontSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });
  return (
    <Box
      overflowX="scroll" // Bật thanh cuộn ngang
      whiteSpace="nowrap" // Đảm bảo các item nằm ngang
      p={4}
      sx={{
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.400',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'gray.100',
        },
      }}
    >
      <HStack spacing={4} w={'280%'}>
        {users?.data?.map((use: any, index: number) => (
          <Card
            w="100%"
            borderColor={'#07a6f0'}
            borderWidth={'1px'}
            alignItems="center"
            // justifyContent="center"
            key={index}
            paddingLeft={6}
            borderRadius={20}
          >
            <Flex
              justify="space-between"
              ps="0px"
              pe="20px"
              pt="5px"
              w="100%"
              paddingTop={6}
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
                  TỈ SỐ GIỚI TÍNH KHI SINH
                </Text>
              </Flex>
            </Flex>
            {/* <Box p={5} maxW="600px" mx="auto" borderWidth="1px" borderRadius="lg"> */}
            {/* Tiêu đề */}
            <VStack spacing={3} textAlign="center" mb={4}>
              {/* <Text fontSize="lg" fontWeight="bold">
                Tỷ số giới tính khi sinh
              </Text> */}
              <Text fontSize="sm" color="gray.500">
                Đơn vị: Số bé trai/100 bé gái
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
                  ♂
                </Text>
              </VStack>
              <VStack mx={4}>
                <Text fontWeight="bold" fontSize="lg">
                  {use?.location === 'ALL' ? 'Toàn tình' : use.location}
                </Text>
                <Text fontSize="2xl" color="blue.500" fontWeight="bold">
                  {use?.percentage}
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Image
                  src="/img/girl-icon.png" // Thay bằng link icon bé gái
                  alt="Bé gái"
                  boxSize="50px"
                />
                <Text color="pink.500" fontWeight="bold" fontSize="lg">
                  ♀
                </Text>
              </VStack>
            </Flex>
            {/* </Box> */}
          </Card>
        ))}
      </HStack>
    </Box>
  );
}
