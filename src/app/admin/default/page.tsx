'use client';

import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import Header from 'components/card/Header';
import IconBox from 'components/icons/IconBox';
import CheckTable from 'views/admin/default/components/PopulationStats';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
import PopulationStats from 'views/admin/default/components/PopulationStats';
// Assets

export default function Default() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  return (
    // <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
    <Box>
      <SimpleGrid
        // columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap="20px"
        mb="10px"
      >
        <Header />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <PopulationStats  />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable tableData={tableDataComplex} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          {/* <MiniCalendar h="100%" minW="100%" selectRange={false} /> */}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
