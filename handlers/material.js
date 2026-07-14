// module.exports = async function (data) {

//     console.log("===== Material Handler =====");

//     console.table(data);

//     // Later we'll call SAP Product API here

//     return `Material upload completed (${data.length} records)`;

// };

const { createMaterial } = require("../utils/destination");

module.exports = async function (data) {

    for (const material of data) {

        const payload = {

            Product: material.Product,
            BaseUnit: material.BaseUnit

        };

        console.log("=================================");
        console.log("Sending to Mock SAP API...");
        console.log(payload);

        const response = await createMaterial(payload);

        console.log("Response from Mock API:");
        console.log(response);
        console.log("=================================");

    }

    return `Material upload completed (${data.length} records)`;

};