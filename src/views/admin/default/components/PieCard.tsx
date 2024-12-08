import React, { useEffect, useRef } from 'react';

import { Circle, Flex, Stack, Text, VStack } from '@chakra-ui/layout';
import { Box, Card, useBreakpointValue } from '@chakra-ui/react';
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

export default function Conversion(props: { [x: string]: any }) {
  const fetchUsers = async () => {
    const response = await axiosInstance.get(apiEndpoints.posts);
    return response.data;
  };
  const fetchAge = async () => {
    const response = await axiosInstance.get(apiEndpoints.comments);
    return response.data;
  };
  const colorMapping: any = {
    senior: '#F28066',
    workingAge: '#7C8C03',
    youth: '#0367A6',
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
    queryKey: ['users'],
    queryFn: ({ queryKey }) => fetchUsers(),
  });

  const { data: age } = useQuery({
    queryKey: ['age'],
    queryFn: ({ queryKey }) => fetchAge(),
  });
  console.log(users);

  const sample =
    users &&
    Object.keys(users.data).map((key) => ({
      name: displayNames[key] || key.toUpperCase(), // Nếu không có tên hiển thị, dùng key gốc
      value: users.data[key],
      color: colorMapping[key],
    }));
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
          paddingBottom={2}
        >
          <Text fontSize={fontSize} color={'#07a6f0'}>
            TỈ TRỌNG DÂN SỐ CHIA THEO NHÓM ĐỘ TUỔI(3 NHÓM)
          </Text>
        </Flex>
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
                    <strong>Value:</strong> {tooltipData?.value}
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
      <Flex marginTop={12} marginLeft={12} w={'100%'}>
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
      </Flex>
    </Card>
  );
}
