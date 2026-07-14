const { createSalesOrder } = require("../utils/destination");

module.exports = async function (data) {

    for (const so of data) {

        const payload = {
            SalesOrder: so.SalesOrder,
            SoldToParty: so.SoldToParty

        };

        console.log("=================================");
        console.log("Sending Sales Order...");
        console.log(payload);

        const response = await createSalesOrder(payload);

        console.log("Response from Mock API:");
        console.log(response);
        console.log("=================================");

    }

    return `Sales Order upload completed (${data.length} records)`;

};