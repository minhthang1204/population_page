import { Box, Flex, Text, Progress, Card } from '@chakra-ui/react';

const MigrationAndUrbanization = () => {
  const data = [
    {
      label: 'Luồng di cư Thành thị --> Thành thị',
      value: 36.5,
      color: 'blue.900',
    },
    {
      label: 'Luồng di cư Thành thị --> Nông thôn',
      value: 9.6,
      color: 'blue.400',
    },
    {
      label: 'Luồng di cư Nông thôn --> Thành thị',
      value: 27.5,
      color: 'pink.300',
    },
    {
      label: 'Luồng di cư Nông thôn --> Nông thôn',
      value: 26.4,
      color: 'yellow.400',
    },
  ];

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <Box width="80%" mx="auto" mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          DI CƯ VÀ ĐÔ THỊ HÓA
        </Text>
        <Text fontSize="sm" mb={6} textAlign="right">
          Đơn vị: %
        </Text>
        {data.map((item, index) => (
          <Flex align="center" mb={4} key={index}>
            <Text flex="1" fontSize="sm">
              {item.label}
            </Text>
            <Flex flex="2" align="center">
              <Progress
                value={item.value}
                size="md"
                width="100%"
                colorScheme={item.color}
                borderRadius="md"
                mr={4}
              />
              <Text fontSize="sm" fontWeight="bold">
                {item.value.toFixed(1)}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Card>
  );
};

export default MigrationAndUrbanization;
