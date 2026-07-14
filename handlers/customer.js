const { createCustomer } = require("../utils/destination");

module.exports = async function (data) {

    for (const customer of data) {

        const payload = {
            Customer: customer.Customer,
            CustomerName: customer.CustomerName

        };

        console.log("=================================");
        console.log("Sending Customer...");
        console.log(payload);

        const response = await createCustomer(payload);

        console.log("Response from Mock API:");
        console.log(response);
        console.log("=================================");

    }

    return `Customer upload completed (${data.length} records)`;

};