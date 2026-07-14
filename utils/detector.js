function detectObjectType(data) {

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    const firstRow = data[0];

    // Material
    if ("Product" in firstRow && "BaseUnit" in firstRow) {
        return "Material";
    }

    // BOM
    if ("Material" in firstRow && "Component" in firstRow) {
        return "BOM";
    }

    // Business Partner
    if ("BusinessPartner" in firstRow) {
        return "BusinessPartner";
    }

    // Customer
    if ("Customer" in firstRow) {
        return "Customer";
    }

    // Sales Order
    if ("SalesOrder" in firstRow) {
        return "SalesOrder";
    }

    return null;
}

module.exports = {
    detectObjectType
};