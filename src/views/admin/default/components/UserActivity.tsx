import { Box, Text, Flex, VStack, Card } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserActivity() {
  const data = {
    labels: ['Được cán bộ y tế đỡ đẻ'],
    datasets: [
      {
        data: [95.4, 4.6], // 95.4% cho "Được cán bộ y tế đỡ đẻ", 4.6% là phần còn lại
        backgroundColor: ['#FF6B6B', '#E0E0E0'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Tắt hiển thị chú thích
      tooltip: { enabled: false }, // Tắt tooltip
    },
    cutout: '70%', // Làm rỗng giữa biểu đồ
  };

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <Box p={5} borderWidth="1px" borderRadius="lg" maxW="400px" mx="auto">
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Tỷ lệ phụ nữ 10-49 tuổi đã từng sinh được cán bộ y tế đỡ đẻ
        </Text>
        <Text fontSize="sm" textAlign="right" mb={6}>
          Đơn vị: %
        </Text>
        <Box position="relative">
          {/* Biểu đồ tròn */}
          <Pie data={data} options={options} />
          {/* Số liệu hiển thị trong vòng tròn */}
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            align="center"
            justify="center"
            flexDirection="column"
          >
            <Text fontSize="2xl" fontWeight="bold" color="red.500">
              95,4
            </Text>
            <Text fontSize="sm" textAlign="center">
              Được cán bộ y tế đỡ đẻ
            </Text>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}
