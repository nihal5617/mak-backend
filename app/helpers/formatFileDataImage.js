import exceljs from "exceljs";

const formatFileDataImage = async (filename, sheetName) => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(filename.buffer);
  const worksheet = workbook.getWorksheet(sheetName);
  const data = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      data.push({
        project_name: row.getCell(1).value.toString(),
        image_url: row.getCell(2).value.toString(),
        carpet_area: row.getCell(3).value || "",
        description: row.getCell(4).value || "",
        type: row.getCell(5).value.toString(),
      });
    }
  });
  return data;
};

export default formatFileDataImage;
