const cds = require("@sap/cds");
// const multer = require("multer");

// const { parseExcel } = require("../utils/excelParser");
const { routeUpload } = require("../utils/router");
const { validateUpload } = require("../utils/validator");
const { detectObjectType } = require("../utils/detector");


// // ----------------------------
// // Multer Configuration
// // ----------------------------

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }

// });

// const upload = multer({
//     storage
// });


// // ----------------------------
// // Register Custom REST API
// // ----------------------------

// cds.on("bootstrap", (app) => {

//     app.post("/upload", upload.single("file"), async (req, res) => {

//         try {

//             const filePath = req.file.path;

//             console.log("Uploaded File:", filePath);

//             // Read Excel
//             let data = parseExcel(filePath);

//             // Detect Object Type
//             let objectType = detectObjectType(data);

//             if (!objectType) {

//                 return res.status(400).json({
//                     success: false,
//                     message: "Unable to detect object type."
//                 });

//             }

//             // Validation
//             validateUpload(
//                 {
//                     reject: (code, message) => {
//                         throw { code, message };
//                     }
//                 },
//                 objectType,
//                 data
//             );

//             // Route
//             const result = await routeUpload(objectType, data);

//             res.json({

//                 success: true,

//                 objectType,

//                 result,

//                 records: data.length

//             });

//         } catch (err) {

//             res.status(err.code || 500).json({

//                 success: false,

//                 message: err.message || err

//             });

//         }

//     });

// });


// ----------------------------
// Existing OData Action
// ----------------------------

module.exports = cds.service.impl(async function () {

    this.on("uploadAnyObject", async (req) => {

        let { objectType, data } = req.data;

        if (!objectType) {

            objectType = detectObjectType(data);

            if (!objectType) {
                return req.reject(400, "Unable to detect Object Type.");
            }

        }

        validateUpload(req, objectType, data);

        return await routeUpload(objectType, data);

    });

});