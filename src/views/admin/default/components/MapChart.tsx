import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Đường dẫn tới file GeoJSON của Việt Nam
const geoUrl = '/district.geojson';

// Dữ liệu dân số (ví dụ)
const populationData: any = {
  'Phuc Hoa': 8000000,
  'Cao Bang': 9000000,
  'Quang Uyen': 12345123,
  // Các tỉnh khác...
};

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
    console.log('Mouse entered:', geo); // Kiểm tra sự kiện
    const districtName = geo.properties.District;
    const population = populationData[districtName] || 'Không có dữ liệu';
    setTooltipContent(`${districtName}: ${population.toLocaleString()} dân`);
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };
  
  const handleMouseLeave = () => {
    console.log('Mouse left'); // Kiểm tra sự kiện
    setTooltipContent(null);
    setTooltipPosition(null);
  };
  

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
            const province = geographies?.filter(
              (feature) => feature.properties.Province === 'Cao Bang',
            );
            return province.map((geo) => {
              const provinceName = geo.properties.District; // Giả sử thuộc tính tên tỉnh là 'name'
              const population = populationData[provinceName] || 0;
              const fillColor = population > 5000000 ? '#3366cc' : '#99ccff'; // Điều chỉnh màu dựa trên dân số
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
