function validateUpload(req, objectType, data) {

    // ----------------------------
    // Validate Object Type
    // ----------------------------
    if (!objectType) {
        return req.reject(400, "Object Type is mandatory.");
    }

    // Supported Objects
    const supportedObjects = [
        "Material",
        "BOM",
        "BusinessPartner",
        "Customer",
        "SalesOrder"
    ];

    if (!supportedObjects.includes(objectType)) {
        return req.reject(400, "Unsupported Object Type.");
    }

    // ----------------------------
    // Validate Data
    // ----------------------------
    if (!data) {
        return req.reject(400, "Data is mandatory.");
    }

    if (!Array.isArray(data)) {
        return req.reject(400, "Data should be an array.");
    }

    if (data.length === 0) {
        return req.reject(400, "No records found.");
    }

    // ----------------------------
    // Object Specific Validation
    // ----------------------------
    switch (objectType) {

        case "Material":
            validateMaterial(req, data);
            break;

        case "BOM":
            validateBOM(req, data);
            break;

        case "BusinessPartner":
            validateBusinessPartner(req, data);
            break;

        case "Customer":
            validateCustomer(req, data);
            break;

        case "SalesOrder":
            validateSalesOrder(req, data);
            break;
    }

    return true;
}


// ==========================================
// Material Validation
// ==========================================

function validateMaterial(req, data) {

    const products = new Set();

    for (const [index, row] of data.entries()) {

        if (!row.Product) {
            return req.reject(400, `Row ${index + 1}: Product is mandatory.`);
        }

        if (!row.BaseUnit) {
            return req.reject(400, `Row ${index + 1}: BaseUnit is mandatory.`);
        }

        if (products.has(row.Product)) {
            return req.reject(409, `Row ${index + 1}: Duplicate Product found.`);
        }

        products.add(row.Product);

    };

}


// ==========================================
// BOM Validation
// ==========================================

function validateBOM(req, data) {

    data.forEach((row, index) => {

        if (!row.Material) {
            return req.reject(409, `Row ${index + 1}: Material is mandatory.`);
        }

        if (!row.Component) {
            return req.reject(409, `Row ${index + 1}: Component is mandatory.`);
        }

    });

}


// ==========================================
// Business Partner Validation
// ==========================================

function validateBusinessPartner(req, data) {

    data.forEach((row, index) => {

        if (!row.BusinessPartner) {
            throw new Error(`Row ${index + 1}: BusinessPartner is mandatory.`);
        }

    });

}


// ==========================================
// Customer Validation
// ==========================================

function validateCustomer(req, data) {

    data.forEach((row, index) => {

        if (!row.Customer) {
            throw new Error(`Row ${index + 1}: Customer is mandatory.`);
        }

    });

}


// ==========================================
// Sales Order Validation
// ==========================================

function validateSalesOrder(req, data) {

    data.forEach((row, index) => {

        if (!row.SalesOrder) {
            throw new Error(`Row ${index + 1}: SalesOrder is mandatory.`);
        }

    });

}


module.exports = {
    validateUpload
};
// What we will validate

// We'll validate in this order:

// Validation	            Example
// objectType exists	   "Material"
// data exists	data:       [ ]
// data is an array	        []
// array is not empty  	    at least 1 record
// mandatory fields	        Product, BaseUnit
// duplicate records        Same Product twice
// unsupported objectType	Invalid object type

// Recommended HTTP Status Codes

// Here's a good mapping to follow:

// Scenario	Status Code	Reason
//
// Missing objectType       	    400 Bad Request     Client sent an invalid request
// Missing mandatory field  	    400 Bad Request	    Input validation failed
// Empty upload             	    400 Bad Request 	Invalid request payload
// Unsupported object type       	400 Bad Request	    Unsupported input
// Duplicate record in upload	    409 Conflict	    Resource conflict
// Record already exists in SAP	    409 Conflict	    Business conflict
// SAP API authentication failed	401 Unauthorized	Invalid credentials/token
// SAP authorization issue	        403 Forbidden	    User lacks permission
// SAP object not found         	404 Not Found	    Referenced object doesn't exist
// SAP API unavailable	            503 Service         Unavailable	External system unavailable
// Unexpected exception	            500 Internal        Server Error	Server-side error