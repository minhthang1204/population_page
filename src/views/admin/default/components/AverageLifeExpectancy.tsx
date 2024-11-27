import { Box, Flex, Text, Circle, Image, Card } from '@chakra-ui/react';

const AverageLifeExpectancy = () => {
  const data = [
    {
      label: 'Thành thị',
      value: 76.2,
      icon: '/city-icon.png',
      color: 'orange.500',
    },
    {
      label: 'Nông thôn',
      value: 72.6,
      icon: '/village-icon.png',
      color: 'gray.500',
    },
    {
      label: 'Toàn quốc',
      value: 73.6,
      icon: '',
      color: 'blue.500',
      isCenter: true,
    },
    { label: 'Nam', value: 71.0, icon: '/male-icon.png', color: 'green.500' },
    { label: 'Nữ', value: 76.3, icon: '/female-icon.png', color: 'red.500' },
  ];

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Tuổi thọ trung bình chia theo giới tính, thành thị nông thôn
        </Text>
        <Text textAlign="center" mb={6} fontSize="sm">
          Đơn vị: Tuổi
        </Text>
        <Flex justify="center" wrap="wrap" gap={6}>
          {data.map((item, index) => (
            <Flex
              key={index}
              flexDirection="column"
              align="center"
              textAlign="center"
              position="relative"
              width={item.isCenter ? '120px' : '100px'}
            >
              {item.icon && (
                <Circle
                  size="80px"
                  bg="white"
                  border="2px solid"
                  borderColor={item.color}
                >
                  <Image src={item.icon} alt={item.label} boxSize="40px" />
                </Circle>
              )}
              {!item.icon && (
                <Circle size="80px" bg={item.color} color="white">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.value}
                  </Text>
                </Circle>
              )}
              <Text
                fontSize="md"
                mt={2}
                fontWeight={item.isCenter ? 'bold' : 'normal'}
              >
                {item.label}
              </Text>
              {!item.isCenter && (
                <Text fontSize="sm" color={item.color} mt={1}>
                  {item.value}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Card>
  );
};

export default AverageLifeExpectancy;
