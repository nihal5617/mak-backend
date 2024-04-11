import exceljs from "exceljs";

const formatFileDataFaq = async (filename, sheetName) => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(filename.buffer);
  const worksheet = workbook.getWorksheet(sheetName);
  const data = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      data.push({
        project_name: row.getCell(1).value.toString(),
        question: row.getCell(2).value.toString(),
        answer: row.getCell(3).value.toString(),
      });
    }
  });
  return data;
};

export default formatFileDataFaq;