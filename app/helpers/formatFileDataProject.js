import exceljs from "exceljs";

const formatFileDataProject = async (filename, sheetName) => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(`assets/${filename}`);
  const worksheet = workbook.getWorksheet(sheetName);
  const data = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      data.push({
        project_name: row.getCell(1).value.toString(),
        name_on_website: row.getCell(2).value.toString(),
        developer_name: row.getCell(3).value.toString(),
        location: row.getCell(4).value.toString(),
        total_towers: row.getCell(5).value.toString(),
        floors: row.getCell(6).value.toString(),
        apts_per_floor: row.getCell(7).value.toString(),
        configuration: row.getCell(8).value.toString(),
        typology: row.getCell(9).value.toString(),
        tower_wise_configuration: row.getCell(10).value.toString(),
        carpet_area: row.getCell(11).value.toString(),
        rera_number: row.getCell(12).value.toString(),
        amenities: row.getCell(13).value.toString(),
        map_location: row.getCell(14).value.toString(),
        map_streetview: row.getCell(15).value.toString(),
        description: row.getCell(16).value.toString(),
        posession_status: row.getCell(17).value.toString(),
      });
    }
  });
  return data;
};

export default formatFileDataProject;
