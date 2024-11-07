import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Đường dẫn tới file GeoJSON của Việt Nam
const geoUrl = '/diaphantinhenglish.geojson';

// Dữ liệu dân số (ví dụ)
const populationData: any = {
  'Hà Nội': 8000000,
  'TP.HCM': 9000000,
  // Các tỉnh khác...
};

const MapChart = () => {
  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <ComposableMap
        projection="geoMercator"
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceName = geo.properties.Name; // Giả sử thuộc tính tên tỉnh là 'name'
              const population = populationData[provinceName] || 0;
              const fillColor = population > 5000000 ? '#3366cc' : '#99ccff'; // Điều chỉnh màu dựa trên dân số

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
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
