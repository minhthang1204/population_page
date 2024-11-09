import { Flex, Box, Text } from '@chakra-ui/react';

export default function GradientBar() {
  return (
    <Flex direction="column" align="center" height="200px">
      {/* Nhãn Lớn nhất */}
      <Text color="orange.500" mb={2}>
        Lớn nhất
      </Text>

      {/* Thanh Gradient */}
      <Box
        width="20px"
        height="100px"
        bgGradient="linear(to-b, blue.500, white)"
        borderRadius="md"
      />

      {/* Nhãn Nhỏ nhất */}
      <Text color="orange.500" mt={2}>
        Nhỏ nhất
      </Text>
    </Flex>
  );
}
