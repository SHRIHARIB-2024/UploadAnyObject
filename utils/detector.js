function detectObjectType(data) {

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    const firstRow = data[0];

    // Material
    if (
        "Product" in firstRow &&
        "BaseUnit" in firstRow
    ) {
        return "Material";
    }

    // BOM
    if (
        "Material" in firstRow &&
        "Component" in firstRow
    ) {
        return "BOM";
    }

    // Business Partner
    if (
        "BusinessPartner" in firstRow &&
        "BPType" in firstRow &&
        "Name" in firstRow
    ) {
        return "BusinessPartner";
    }

    // Sales Order
    if (
        "SalesOrder" in firstRow &&
        "Customer" in firstRow &&
        "Material" in firstRow
    ) {
        return "SalesOrder";
    }

    // Customer
    if (
        "CustomerID" in firstRow &&
        "CustomerName" in firstRow
    ) {
        return "Customer";
    }

    return null;

}

module.exports = {
    detectObjectType
};