// module.exports = async function (data) {
//     console.log("===== BOM Handler =====");
//     console.table(data);
//     // Later we'll call SAP BOM API here
//     return `BOM upload completed (${data.length} records)`;

// };

const { createBOM } = require("../utils/destination");

module.exports = async function (data) {

    for (const bom of data) {

        const payload = {
            Material: bom.Material,
            Component: bom.Component

        };

        console.log("=================================");
        console.log("Sending BOM to Mock SAP...");
        console.log(payload);

        const response = await createBOM(payload);

        console.log("Response from Mock API:");
        console.log(response);

        console.log("=================================");

    }

    return `BOM upload completed (${data.length} records)`;

};