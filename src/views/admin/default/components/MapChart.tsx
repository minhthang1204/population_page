import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Đường dẫn tới file GeoJSON của Việt Nam
const geoUrl = '/diaphantinhenglish.geojson';

// Dữ liệu dân số (ví dụ)
const populationData: any = {
  'Ha Noi': 8000000,
  'Cao Bang': 9000000,
  // Các tỉnh khác...
};

const MapChart = () => {
  return (
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2500, // Tăng giá trị để phóng to bản đồ
          center: [105.85, 21.0285], // Tâm bản đồ, có thể chỉnh để di chuyển vị trí bản đồ
        }}
      >
        <Geographies geography={geoUrl} >
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceName = geo.properties.Name; // Giả sử thuộc tính tên tỉnh là 'name'
              const population = populationData[provinceName] || 0;
              const fillColor = population > 5000000 ? '#3366cc' : '#99ccff'; // Điều chỉnh màu dựa trên dân số
              console.log(populationData[provinceName])
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
          }
        </Geographies>
      </ComposableMap>
  );
};

export default MapChart;
