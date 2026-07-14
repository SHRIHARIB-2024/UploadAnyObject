// const axios = require("axios");

// async function callSAPAPI(payload) {

//     try {

//         const response = await axios.post(
//             "https://httpbin.org/post",
//             payload,
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         return response.data;

//     } catch (error) {

//         console.error(error.message);

//         throw error;

//     }

// }

// module.exports = {
//     callSAPAPI
// };
const axios = require("axios");

const BASE_URL = "http://localhost:4004/mock/sap";

async function createMaterial(payload) {

    const response = await axios.post(
        `${BASE_URL}/material`,
        payload
    );

    return response.data;
}

async function createBOM(payload) {

    const response = await axios.post(
        `${BASE_URL}/bom`,
        payload
    );

    return response.data;
}

async function createBusinessPartner(payload) {

    const response = await axios.post(
        `${BASE_URL}/businessPartner`,
        payload
    );

    return response.data;
}

async function createCustomer(payload) {

    const response = await axios.post(
        `${BASE_URL}/customer`,
        payload
    );

    return response.data;
}

async function createSalesOrder(payload) {

    const response = await axios.post(
        `${BASE_URL}/salesOrder`,
        payload
    );

    return response.data;
}

module.exports = {

    createMaterial,
    createBOM,
    createBusinessPartner,
    createCustomer,
    createSalesOrder

};