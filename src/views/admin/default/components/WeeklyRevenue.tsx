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
import Card from 'components/card/Card';
// Custom components
import BarChart from 'components/charts/BarChart';
import React from 'react';
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from 'variables/charts';
import { MdBarChart } from 'react-icons/md';
import MapChart from './MapChart';
import GradientBar from './PeopleDescription';
import PopulationChart from './PopulationChart';
import GaugeChart from './GaugeChart';

export default function WeeklyRevenue(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
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

  return (
    <Card w="100%" borderColor={'#07a6f0'} borderWidth={'1px'} {...rest}>
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px" w="100%">
        <Flex
          align="center"
          w="100%"
          justify={{ base: 'center', xl: 'center' }}
          borderBottom={'1px'}
          borderBottomColor={'#07a6f0'}
        >
          <Text fontSize={fontSize} color={'#07a6f0'}>
            Dân số: 
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" flexDirection={{ base: 'row', lg: 'row' , sm: 'column', md: 'column'}}>
      <PopulationChart />
      <GaugeChart />
      </Flex>
    </Card>
  );
}
