const fs = require('fs');

// Đọc file JSON gốc
fs.readFile('district.geojson', 'utf8', (err, data) => {
  if (err) {
    console.error('Không thể đọc file:', err);
    return;
  }

  try {
    // Parse dữ liệu JSON
    const jsonData = JSON.parse(data);

    // Lọc ra các huyện của tỉnh Cao Bằng
    const caoBangDistricts = jsonData.features.filter(
      (feature) => feature.properties.Province === 'Cao Bang'
    );

    // Tạo JSON mới chỉ chứa dữ liệu của Cao Bằng
    const filteredData = {
      type: 'FeatureCollection',
      crs: jsonData.crs,
      features: caoBangDistricts,
    };

    // Ghi kết quả ra file JSON mới
    fs.writeFile(
      'caobang_districts.json',
      JSON.stringify(filteredData, null, 2),
      (err) => {
        if (err) {
          console.error('Không thể ghi file:', err);
        } else {
          console.log('Đã tạo file caobang_districts.json thành công!');
        }
      }
    );
  } catch (parseError) {
    console.error('Lỗi khi parse dữ liệu JSON:', parseError);
  }
});
