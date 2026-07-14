// This utility has only one job:

// Insert one upload log into the database.

const cds = require("@sap/cds");

const { INSERT } = cds.ql;

async function logUpload(logData) {

    const db = await cds.connect.to("db");

    await db.run(

        INSERT.into("upload.UploadLogs").entries({

            objectType: logData.objectType,

            fileName: logData.fileName,

            uploadedBy: logData.uploadedBy,

            status: logData.status,

            message: logData.message,

            createdAt: new Date()

        })

    );

}

module.exports = {
    logUpload
};