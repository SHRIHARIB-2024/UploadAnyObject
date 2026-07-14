// module.exports = async function (data) {

//     console.log("===== Business Partner Handler =====");

//     console.table(data);
//     // // Later we'll call SAP BP API here
//     return `Business Partner upload completed (${data.length} records)`;

// };

const { createBusinessPartner } = require("../utils/destination");

module.exports = async function (data) {

    for (const bp of data) {

        const payload = {
            BusinessPartner: bp.BusinessPartner,
            OrganizationBPName1: bp.OrganizationBPName1

        };

        console.log("=================================");
        console.log("Sending Business Partner...");
        console.log(payload);

        const response = await createBusinessPartner(payload);

        console.log("Response from Mock API:");
        console.log(response);
        console.log("=================================");

    }

    return `Business Partner upload completed (${data.length} records)`;

};