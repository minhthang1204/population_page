import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import axiosInstance from '../../../../../utils/axiosInstance';
import apiEndpoints from '../../../../../utils/apiConfig';
import { useQuery } from '@tanstack/react-query';

// Đường dẫn tới file GeoJSON của Việt Nam
const geoUrl = '/caobang_districts.json';

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
    if (population < 80) return '#99ccff'
    if (population < 90) return '#31a0f5'
    if (population < 100) return '#217ec4'
    if (population < 110) return '#1b6aa6'
    if (population < 120) return '#1266a6'
    if (population < 130) return '#2463d1'
    return '#3366cc'
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Tooltip */}
      {tooltipContent && tooltipPosition && (
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
      )}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 25000, // Tăng giá trị để phóng to bản đồ
          center: [106.1, 22.6633], // Tâm bản đồ, có thể chỉnh để di chuyển vị trí bản đồ
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            // const province = geographies?.filter(
            //   (feature) => feature.properties.Province === 'Cao Bang',
            // );
            return geographies.map((geo) => {
              const provinceCode = geo.properties.OBJECTID; 
              // Find the matching population data using DISTRICT_ID
              const matchingDistrict = populationData?.find(
                (data: any) => data.DISTRICT_ID === provinceCode,
              );

              // Get population count or default to 0
              const population = matchingDistrict?.POPULATIONCOUNT || 0;

              // Determine fill color based on population
              const fillColor = renderColor(population);
              console.log(typeof geo);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#ffa726', outline: 'none' },
                    pressed: { fill: '#ff7043', outline: 'none' },
                  }}
                  onMouseEnter={(event) => handleMouseEnter(geo, event)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
