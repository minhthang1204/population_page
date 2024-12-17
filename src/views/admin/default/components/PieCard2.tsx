import React, { useEffect, useRef, useState } from 'react';

import { Circle, Flex, Stack, Text, VStack } from '@chakra-ui/layout';
import { Box, Card, FormControl, FormLabel, Select, useBreakpointValue } from '@chakra-ui/react';
import { Group } from '@visx/group';
import { Legend } from '@visx/legend';
import { Pie } from '@visx/shape';
import { Tooltip } from '@visx/tooltip';
import { useAnimation } from 'framer-motion';

import MotionPieArch from '../chart/MotionPieArch';
import usePieChart from '../chart/usePieChart';
import { MotionBox } from './motion';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import districtsData from '../../../../../public/caobang_districts.json';

export default function Conversion2(props: { [x: string]: any }) {

  const [districtFilter, setDistrictFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  const districts = districtsData.features.map((feature) => ({
    OBJECTID: feature.properties.OBJECTID,
    District: feature.properties.District,
  }));
  const fetchUsers = async (district: string) => {
    const params = { hometown: district === 'all' ? '' : district };
    const response = await axiosInstance.get(apiEndpoints.typePopulation, {
      params
    });
    return response.data;
  };
  const fetchAge = async () => {
    const response = await axiosInstance.get(apiEndpoints.comments);
    return response.data;
  };
  const colorMapping: any = {
    0: '#FF5733',
    1: '#33FF57',
    2: '#3357FF',
    3: '#FF33A1',
    4: '#A133FF',
    5: '#33FFF5',
    6: '#F5FF33',
    7: '#FF8C00',
    8: '#FF4500',
    9: '#DA70D6',
    10: '#EEE8AA',
    11: '#8FBC8F',
    12: '#FA8072',
    13: '#FFD700',
    14: '#E9967A',
    15: '#20B2AA',
    16: '#9370DB',
    17: '#3CB371',
    18: '#FF1493',
    19: '#00FA9A',
    20: '#6495ED',
    21: '#C71585',
    22: '#D2691E',
    23: '#FF6347',
    24: '#40E0D0',
    25: '#D2B48C',
    26: '#BA55D3',
    27: '#32CD32',
    28: '#FFA07A',
    29: '#4682B4',
    30: '#9ACD32',
    31: '#00BFFF',
    32: '#ADFF2F',
    33: '#8A2BE2',
    34: '#FF00FF',
    35: '#FF69B4',
    36: '#BDB76B',
    37: '#7B68EE',
    38: '#F4A460',
    39: '#00CED1',
    40: '#FFB6C1',
    41: '#2F4F4F',
    42: '#66CDAA',
    43: '#DC143C',
    44: '#F0E68C',
    45: '#00FF7F',
    46: '#CD5C5C',
    47: '#7FFF00',
    48: '#00FF00',
    49: '#6B8E23',
    50: '#FF7F50',
    51: '#483D8B',
    52: '#2E8B57',
    53: '#BC8F8F',
  };  

  const displayNames: { [key: string]: string } = {
    senior: '65+',
    workingAge: '15-65',
    youth: '0-14',
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['usersType', districtFilter],
    queryFn: ({ queryKey }) => fetchUsers(districtFilter),
  });

  // const { data: age } = useQuery({
  //   queryKey: ['age'],
  //   queryFn: ({ queryKey }) => fetchAge(),
  // });
  console.log('users', users);

  const sample =
  users?.data?.map((item: any, index: number) => ({
    name: displayNames[item.ethnicity] || item.ethnicity.toUpperCase(), // Use 'item.type' as the key
    value: item.total, // Assume the new array has 'value' key
    color: colorMapping[index], // Map color based on 'item.type'
  })) || [];

  console.log(sample)

  const {
    colorScale,
    containerRef,
    handleTooltipHide,
    handleTooltipShow,
    innerRadius,
    outerRadius,
    size,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
    x,
    y,
  } = usePieChart(sample, 220, 32, {
    left: 24,
    right: 12,
  });

  const archFinish = useRef<Promise<any>>(null);
  const boxController = useAnimation();

  useEffect(() => {
    async function animate() {
      await archFinish.current;
      await boxController.start({
        opacity: 1,
        x: 0,
      });
    }

    animate();
  }, [archFinish, boxController]);

  const fontSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });

  const formattedValue = (tooltipData?.value && !isNaN(tooltipData.value))
  ? (tooltipData?.value).toFixed(2)
  : tooltipData?.value;

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      // justifyContent="center"
      paddingLeft={6}
      borderRadius={20}
    >
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pt="5px"
        w="100%"
        marginTop={6}
      >
        <Flex
          align="center"
          w="100%"
          justify={{ base: 'center', xl: 'center' }}
          borderBottom={'1px'}
          borderBottomColor={'#07a6f0'}
          paddingBottom={10}
        >
          <Text fontSize={fontSize} color={'#07a6f0'}>
            TỈ TRỌNG DÂN TỘC
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent={'space-between'} marginBottom={8}>
        <FormControl display="flex" alignItems="center" marginRight={10} marginTop={2} marginBottom={2}>
          <FormLabel htmlFor="district-filter" mb="0">
            Xã/Huyện:
          </FormLabel>
          <Select
            id="district-filter"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            ml="2"
            w="200px"
          >
            <option value="all">Tất cả</option>
            {districts.map((district) => (
              <option key={district.OBJECTID} value={district.OBJECTID}>
                {district.District}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
      <Flex align="center" marginTop={12}>
        <Box pos="relative" ref={containerRef}>
          <svg width={size} height={size}>
            <Group left={size >> 1} top={size >> 1}>
              <Pie
                data={sample}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                pieValue={y}
                padAngle={Math.PI / 180}
              >
                {({ arcs, path }) =>
                  arcs.map((arch) => {
                    const { data } = arch;
                    const fillColor = colorScale(x(data));
                    return (
                      <MotionPieArch
                        onMouseMove={handleTooltipShow}
                        onMouseOut={handleTooltipHide}
                        key={x(data)}
                        fill={fillColor}
                        path={path(arch)}
                        name={data.name}
                        value={data.value}
                        finish={archFinish}
                      />
                    );
                  })
                }
              </Pie>
            </Group>
          </svg>
          <Box hidden={!tooltipOpen}>
            <Tooltip left={tooltipLeft} top={tooltipTop}>
              <Flex align="center">
                <Box
                  boxSize={2}
                  bg={tooltipData?.color}
                  rounded="full"
                  mr={2}
                />
                <Stack spacing="1">
                  <Text whiteSpace="nowrap">
                    {/* <strong>Name:</strong> {
            tooltipData?.name && displayNames[tooltipData?.name as keyof typeof displayNames]
          } */}
                  </Text>
                  <Text whiteSpace="nowrap">
                    <strong>Value:</strong> {formattedValue}
                    {'%'}
                  </Text>
                </Stack>
              </Flex>
            </Tooltip>
          </Box>
        </Box>
        <MotionBox
          ml={4}
          initial={{ opacity: 0, x: 16 }}
          animate={boxController}
        >
          <Legend
            scale={colorScale}
            shape="circle"
            itemMargin={8}
            shapeHeight={12}
            shapeWidth={12}
          />
        </MotionBox>
      </Flex>
      {/* <Flex marginTop={12} marginLeft={12} w={'100%'}>
        <VStack
          marginTop={8}
          borderTopWidth={1}
          borderTopColor={'#07a6f0'}
          paddingTop={2}
          alignSelf={'center'}
          w={'92%'}
        >
          <Text fontSize="lg" fontWeight="bold">
            CHỈ SỐ GIÀ HÓA
          </Text>
          <Circle size="50px" bg="blue.100">
            <Text fontSize="2xl" color="blue.600">
              👨
            </Text>
          </Circle>
          <Text fontSize="lg" fontWeight="bold">
            {age?.data}
            {'%'}
          </Text>
        </VStack>
      </Flex> */}
    </Card>
  );
}
