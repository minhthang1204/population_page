import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import { useQuery } from '@tanstack/react-query';
import * as d3 from 'd3-geo';

// Đường dẫn tới file GeoJSON của Việt Nam
const geoUrl = '/caobang_districts.json';
const projection = d3
  .geoMercator()
  .scale(28000) // Chỉnh scale phù hợp với bản đồ của bạn
  .center([106.05, 22.6633]); // Điểm trung tâm của bản đồ

// // Dữ liệu dân số (ví dụ)
// const populationData: any = {
//   'Phuc Hoa': 8000000,
//   'Cao Bang': 9000000,
//   'Quang Uyen': 12345123,
//   // Các tỉnh khác...
// };

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fetchUsers = async () => {
    const params = { hometown: '' };
    const response = await axiosInstance.get(apiEndpoints.register);
    return response.data;
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['peopleInMap'],
    queryFn: ({ queryKey }) => fetchUsers(),
  });

  const populationData = users?.data;

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    const provinceCode = geo.properties.OBJECTID;
    // Find the matching population data using DISTRICT_ID
    const matchingDistrict = populationData.find(
      (data: any) => data.DISTRICT_ID === provinceCode,
    );

    // Get population count or default to 0
    const districtName = matchingDistrict?.DISTRICT || 'Cao Bang';
    const population = matchingDistrict?.POPULATIONCOUNT || 0;
    setTooltipContent(`${districtName}: ${population.toLocaleString()} dân`);
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
    setTooltipPosition(null);
  };

  const renderColor = (population: number) => {
    switch (population) {
      case 601:
        return '#D0021B';
      case 605:
        return '#F5A623';
      case 608:
        return '#4A90E2';
      case 611:
        return '#7ED321';
      case 612:
        return '#9013FE';
      case 616:
        return '#50E3C2';
      case 617:
        return '#B8E986';
      case 622:
        return '#BD10E0';
      case 624:
        return '#F8E71C';
      case 625:
        return '#8B572A';
      case 626:
        return '#417505';
      case 628:
        return '#F56A79';
      case 629:
        return '#001AFF';
      default:
        return '#3366cc';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Tooltip */}
      {/* {tooltipContent && tooltipPosition && (
        <div
          style={{
            position: 'absolute',
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            background: '#FFFFCC',
            padding: '5px 10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {tooltipContent}
        </div>
      )} */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 28000, // Tăng giá trị để phóng to bản đồ
          center: [106.05, 22.6633], // Tâm bản đồ, có thể chỉnh để di chuyển vị trí bản đồ
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies, projection }) => {
            // const province = geographies?.filter(
            //   (feature) => feature.properties.Province === 'Cao Bang',
            // );
            return geographies.map((geo) => {
              const provinceCode = geo.properties.OBJECTID;
              // Find the matching population data using DISTRICT_ID
              const matchingDistrict = populationData?.find(
                (data: any) => data.districtId === provinceCode,
              );

              // Get population count or default to 0
              const population = matchingDistrict?.POPULATIONCOUNT || 0;
              const districtName = matchingDistrict?.districtName || 'Cao Bằng';
              // const districtName = 'Cao Bằng';

              // Determine fill color based on population
              const fillColor = renderColor(provinceCode);
              const [longitude, latitude] = geo.properties.CENTROID || [
                106.22258150613553, 22.625977016739285,
              ];

              const [x, y] = projection([longitude, latitude]);
              console.log('asd', x, y);
              return (
                <g key={geo.rsmKey}>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#ffa726', outline: 'none' },
                      pressed: { fill: '#ff7043', outline: 'none' },
                    }}
                  />
                  {/* <text
                    x={x}
                    y={y}
                    // textAnchor="middle"
                    style={{
                      fill: '#fff',
                      fontSize: '12px',
                      fontWeight: 'normals',
                      pointerEvents: 'none',
                      zIndex: 100,
                      position: 'absolute',
                    }}
                  >
                    {districtName}
                  </text> */}
                </g>
              );
            });
          }}
        </Geographies>
      </ComposableMap>
      {/* Overlay tên các tỉnh */}
      {populationData?.map((district: any) => {
        console.log(district);
        const central = [district.coordinates_.x, district.coordinates_.y];
        const [longitude, latitude] = central || [
          106.25975044500007, 22.579445053000086,
        ];
        // const [x, y] = central || [
        //   106.25975044500007, 22.579445053000086,
        // ];
        const [x, y] = projection([longitude - 0.18, latitude - 0.06]) || [
          0, 0,
        ];
        console.log('object', x, y);
        return (
          <div
            key={district.districtId}
            style={{
              position: 'absolute',
              top: y,
              left: x,
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '2px 5px',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {district.districtName}
          </div>
        );
      })}
    </div>
  );
};

export default MapChart;
