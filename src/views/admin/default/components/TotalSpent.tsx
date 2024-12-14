// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from 'variables/charts';
import MapChart from './MapChart';
import GradientBar from './PeopleDescription';

export default function TotalSpent(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' },
  );
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' },
  );
  const fontSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Card
      // justifyContent="center"
      alignItems="center"
      flexDirection="column"
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      
    >
        <Flex
          align="center"
          w="100%"
          justify={{ base: 'center', xl: 'center' }}
          borderBottom={'1px'}
          borderBottomColor={'#07a6f0'}
          marginTop={4}
        >
          <Text fontSize={fontSize} color={'#07a6f0'}>BẢN ĐỒ DÂN SỐ TỈNH CAO BẰNG NĂM 2019</Text>
        </Flex>
      <Flex w="100%" flexDirection={{ base: 'column', lg: 'column' }}>
        <Box minH="260px" minW="75%" mt="auto">
          <MapChart />
        </Box>
        {/* <Box justifySelf={'center'} alignSelf={'center'}>
          <GradientBar />
        </Box> */}
      </Flex>
    </Card>
  );
}
