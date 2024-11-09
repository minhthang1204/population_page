import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Đường dẫn tới file GeoJSON của Việt Nam
const geoUrl = '/district.geojson';

// Dữ liệu dân số (ví dụ)
const populationData: any = {
  'Phuc Hoa': 8000000,
  'Cao Bang': 9000000,
  "Quang Uyen": 12345123,
  // Các tỉnh khác...
};

const MapChart = () => {
  return (
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 25000, // Tăng giá trị để phóng to bản đồ
          center: [106.10, 22.6633], // Tâm bản đồ, có thể chỉnh để di chuyển vị trí bản đồ
        }}
      >
        <Geographies geography={geoUrl} >
          {({ geographies }) => {
            const province = geographies?.filter(feature => feature.properties.Province === "Cao Bang")
            return province.map((geo) => {
              const provinceName = geo.properties.District; // Giả sử thuộc tính tên tỉnh là 'name'
              const population = populationData[provinceName] || 0;
              const fillColor = population > 5000000 ? '#3366cc' : '#99ccff'; // Điều chỉnh màu dựa trên dân số
              console.log(typeof geo)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  style={{
                    default: { outline: 'none', },
                    hover: { fill: '#ffa726', outline: 'none' },
                    pressed: { fill: '#ff7043', outline: 'none' },
                  }}
                />
              );
            })
          }}
        </Geographies>
      </ComposableMap>
  );
};

export default MapChart;
