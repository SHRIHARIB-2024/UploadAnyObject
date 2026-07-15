const cds = require("@sap/cds");
const multer = require("multer");
const express = require("express");
const fs = require("fs");

const { logUpload } = require("./utils/logger");
const { parseExcel } = require("./utils/excelParser");
const { detectObjectType } = require("./utils/detector");
const { validateUpload } = require("./utils/validator");
const { routeUpload } = require("./utils/router");

// --------------------------------------------------
// Multer Configuration
// --------------------------------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// --------------------------------------------------
// Bootstrap
// --------------------------------------------------

cds.on("bootstrap", app => {

    app.use(express.json());

    console.log("✅ Registering Upload REST API...");

    // ==================================================
    // Mock SAP Material API
    // ==================================================

    app.post("/mock/sap/material", (req, res) => {

        console.log("========== MOCK SAP MATERIAL ==========");
        console.log(req.body);

        res.json({
            success: true,
            sapMessage: "Material Created Successfully",
            material: req.body
        });

    });

    // ==================================================
    // Mock SAP BOM API
    // ==================================================

    app.post("/mock/sap/bom", (req, res) => {

        console.log("========== MOCK SAP BOM ==========");
        console.log(req.body);

        res.json({
            success: true,
            sapMessage: "BOM Created Successfully",
            bom: req.body
        });

    });

    // ==================================================
    // Mock SAP Business Partner API
    // ==================================================

    app.post("/mock/sap/businessPartner", (req, res) => {

        console.log("========== MOCK SAP BUSINESS PARTNER ==========");
        console.log(req.body);

        res.json({
            success: true,
            sapMessage: "Business Partner Created Successfully",
            businessPartner: req.body
        });

    });

    // ==================================================
    // Mock SAP Customer API
    // ==================================================

    app.post("/mock/sap/customer", (req, res) => {

        console.log("========== MOCK SAP CUSTOMER ==========");
        console.log(req.body);

        res.json({
            success: true,
            sapMessage: "Customer Created Successfully",
            customer: req.body
        });

    });

    // ==================================================
    // Mock SAP Sales Order API
    // ==================================================

    app.post("/mock/sap/salesOrder", (req, res) => {

        console.log("========== MOCK SAP SALES ORDER ==========");
        console.log(req.body);

        res.json({
            success: true,
            sapMessage: "Sales Order Created Successfully",
            salesOrder: req.body
        });

    });

    // ==================================================
    // Upload API
    // ==================================================

    app.post("/upload", upload.single("file"), async (req, res) => {

        let filePath;

        try {

            filePath = req.file.path;

            // Read Excel
            const data = parseExcel(filePath);

            // Detect Object Type
            const objectType = detectObjectType(data);

            if (!objectType) {
                return res.status(400).json({
                    success: false,
                    message: "Unable to detect object type."
                });
            }

            // Validation
            validateUpload(
                {
                    reject: (code, message) => {
                        throw { code, message };
                    }
                },
                objectType,
                data
            );

            // Route to appropriate handler
            const result = await routeUpload(objectType, data);

            // Save upload log
            await logUpload({
                objectType,
                fileName: req.file.originalname,
                uploadedBy: "SHRIHARI", // Later: req.user.id
                status: "SUCCESS",
                message: result
            });

            // Delete uploaded file
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("🗑 Temporary file deleted.");
            }

            // Response
            res.json({
                success: true,
                fileName: req.file.originalname,
                objectType,
                records: data.length,
                result
            });

        }

        catch (err) {

            // Save failed log
            try {

                await logUpload({
                    objectType: "Unknown",
                    fileName: req.file?.originalname || "No File",
                    uploadedBy: "SHRIHARI",
                    status: "FAILED",
                    message: err.message || String(err)
                });

            } catch (logErr) {

                console.error("Logging Failed:", logErr);

            }

            // Delete uploaded file
            if (filePath && fs.existsSync(filePath)) {

                fs.unlinkSync(filePath);

                console.log("🗑 Temporary file deleted.");

            }

            // Determine status code
            const statusCode =
                err.response?.status ||
                (typeof err.code === "number" ? err.code : 500);

            // Return error
            res.status(statusCode).json({

                success: false,

                message: err.message || String(err)

            });

        }

    });

});

module.exports = cds.server;