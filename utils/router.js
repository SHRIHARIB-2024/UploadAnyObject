const materialHandler = require("../handlers/material");
const bomHandler = require("../handlers/bom");
const businessPartnerHandler = require("../handlers/businessPartner");

async function routeUpload(objectType, data) {

    switch (objectType.toLowerCase()) {

        case "material":
            return await materialHandler(data);

        case "bom":
            return await bomHandler(data);

        case "businesspartner":
            return await businessPartnerHandler(data);

        case "customer":
            return await customerHandler(data);

        case "salesorder":
            return await salesOrderHandler(data);

        default:
            throw new Error(`Unsupported object type: ${objectType}`);
    }
}

module.exports = {
    routeUpload
};
// This file's only responsibility is deciding which handler should process the data.