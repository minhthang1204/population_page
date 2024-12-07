// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  useBreakpointValue,
  Icon,
  Box,
} from '@chakra-ui/react';
import Image from 'next/image';
// Custom components
import Card from 'components/card/Card';
import { IoIosSearch } from 'react-icons/io';
import UploadExcel from 'components/button/UploadExcel';

export default function Default(props: {}) {
  // const { startContent, endContent, name, growth, value } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  const fontSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl',
  });
  const imageSize = useBreakpointValue({
    base: '100px',
    md: '300px',
    lg: '500px',
  });

  return (
    <div>
      <Card flexDirection={'row'}>
        <Flex
          my="auto"
          h="100%"
          align={{ base: 'center', xl: 'center' }}
          justify={{ base: 'start', xl: 'start' }}
        >
          <Image
            alt="logo cục thống kê"
            src={'/img/log_main.png'}
            width={220}
            height={220}
          />
          <Text fontFamily={'sans-serif'} fontSize={fontSize}>
            DỮ LIỆU TỔNG ĐIỀU TRA DÂN SỐ VÀ NHÀ Ở TỈNH CAO BẰNG NĂM 2019
          </Text>
        </Flex>
        <Flex
          align={{ base: 'center', xl: 'center' }}
          justify={{ base: 'end', xl: 'end' }}
          marginLeft={'12px'}
          ml={'auto'}
		  mr={'10px'}
        >
          {/* <Icon fontSize="24px" color="tomato">
            <IoIosSearch />
          </Icon>
          <Text>Tìm kiếm</Text> */}
          <UploadExcel />
          <Box
            width={['20px', '30px', '30px', '30px']}
            height={['20px', '30px', '30px', '30px']}
            position="relative"
			ml={'28px'}
          >
            <Image
              src="/img/flags/vietnam-flag.png"
              alt="Responsive Image"
              layout="fill"
              objectFit="contain"
            />
          </Box>
		  <Box
            width={['20px', '30px', '30px', '30px']}
            height={['20px', '30px', '30px', '30px']}
            position="relative"
			ml={'4px'}
          >
			<Image
              src="/img/flags/uk-flag.jpg"
              alt="Responsive Image"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Card>
    </div>
  );
}
