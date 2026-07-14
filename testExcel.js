const { parseExcel } = require("./utils/excelParser");

const data = parseExcel("./uploads/Material.xlsx");

console.log(data);