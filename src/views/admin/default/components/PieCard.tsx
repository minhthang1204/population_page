import React, { useEffect, useRef } from 'react';

import { Flex, Stack, Text } from '@chakra-ui/layout';
import { Box, Card } from '@chakra-ui/react';
import { Group } from '@visx/group';
import { Legend } from '@visx/legend';
import { Pie } from '@visx/shape';
import { Tooltip } from '@visx/tooltip';
import { useAnimation } from 'framer-motion';

import MotionPieArch from '../chart/MotionPieArch';
import usePieChart from '../chart/usePieChart';
import { MotionBox } from './motion';

const sample = [
  { name: 'GA', value: 10, color: '#F28066' },
  { name: 'GB', value: 8, color: '#F2E3D5' },
  { name: 'GC', value: 12, color: '#7C8C03' },
  { name: 'GD', value: 24, color: '#0367A6' },
];

export default function Conversion(props: { [x: string]: any }) {
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
  } = usePieChart(sample, 360, 32, {
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

  return (
    <Card
      w="100%"
      borderColor={'#07a6f0'}
      borderWidth={'1px'}
      alignItems="center"
      justifyContent="center"
    >
      <Flex align="center" >
        <Box pos="relative" ref={containerRef} >
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
                    <strong>Name:</strong> {tooltipData?.name}
                  </Text>
                  <Text whiteSpace="nowrap">
                    <strong>Value:</strong> {tooltipData?.value}
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
    </Card>
  );
}
