'use client';

import { Box, Icon, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
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
import UserActivity from 'views/admin/default/components/UserActivity';
import SexatBirth from 'views/admin/default/components/SexatBirth';
import InfantMortalityRate from 'views/admin/default/components/InfantMortalityRate';
import AverageLifeExpectancy from 'views/admin/default/components/AverageLifeExpectancy';
import MigrationAndUrbanization from 'views/admin/default/components/MigrationAndUrbanization';
import MarriedBefore18 from 'views/admin/default/components/MarriedBefore18';
import Graduation from 'views/admin/default/components/Graduation';
import JobExp from 'views/admin/default/components/JobExp';
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

      <SimpleGrid columns={{ base: 1, md: 10, xl: 10 }} gap="20px" mb="20px">
        <Box gridColumn={{ base: 'span 1', md: 'span 7' }}>
        <TotalSpent />
        </Box>
        <Box gridColumn={{ base: 'span 1', md: 'span 3' }}>
        <WeeklyRevenue />
        </Box>
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        
      </SimpleGrid> */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <PopulationStats />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px"> */}
        <PieCard />
        {/* </SimpleGrid> */}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        {/* <UserActivity /> */}
        <SexatBirth />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <InfantMortalityRate />
        <Graduation />
        {/* <AverageLifeExpectancy /> */}
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <MigrationAndUrbanization />
      </SimpleGrid> */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        {/* <AverageLifeExpectancy /> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable />
        <JobExp />
        {/* <MarriedBefore18 /> */}

        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
        </SimpleGrid> */}
      </SimpleGrid>
    </Box>
  );
}
