// This file will have only one responsibility:
// Read Excel → Convert to JSON

const XLSX = require("xlsx");

function parseExcel(filePath) {

    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;

}

module.exports = {
    parseExcel
};