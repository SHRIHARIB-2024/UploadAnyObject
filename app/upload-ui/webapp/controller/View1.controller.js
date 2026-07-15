sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ColumnListItem"
], (
    Controller,
    MessageToast,
    Column,
    Text,
    ColumnListItem
) => {
    "use strict";

    return Controller.extend("com.upload.uploadui.controller.View1", {
        onInit() {
        },
        onUpload() {
            const oUploader = this.byId("fileUploader");

            const files = oUploader.getFocusDomRef().files;

            if (!files || files.length === 0) {
                MessageToast.show("Please choose a file.");
                return;
            }

            const formData = new FormData();

            formData.append("file", files[0]);

            fetch("/upload", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(result => {

                    const oStrip = this.byId("msgStrip");

                    oStrip.setVisible(true);

                    oStrip.setType("Success");

                    oStrip.setText(
                        `${result.result}
                        Object Type: ${result.objectType}
                        Records Uploaded: ${result.records}`
                    );

                    MessageToast.show(result.result);

                    this.byId("uploadTable")
                        .getBinding("items")
                        .refresh();

                    console.log(result);

                })
                .catch(error => {

                    console.error(error);

                    MessageToast.show("Upload Failed");

                });
        },

        onViewFile(oEvent) {

            // Selected upload row
            const oContext = oEvent.getSource().getBindingContext();

            const oData = oContext.getObject();

            // For title
            const oDialog = this.byId("dataDialog");

            oDialog.setTitle(
                `${oData.fileName} (${oData.objectType})`
            );

            // Convert JSON string back to JavaScript array
            const uploadedRecords = JSON.parse(oData.uploadedJson);

            const oTable = this.byId("dataTable");

            // Remove old columns and rows
            oTable.removeAllColumns();
            oTable.removeAllItems();

            // No uploaded records
            if (!uploadedRecords || uploadedRecords.length === 0) {
                MessageToast.show("No uploaded data found.");
                return;
            }

            // Get column names from first record
            const keys = Object.keys(uploadedRecords[0]);

            // Create table columns
            keys.forEach(key => {

                oTable.addColumn(

                    new Column({
                        header: new Text({
                            text: key
                        })
                    })

                );

            });

            // Create rows
            uploadedRecords.forEach(record => {

                const cells = [];

                keys.forEach(key => {

                    cells.push(

                        new Text({
                            text: record[key]
                        })

                    );

                });

                oTable.addItem(

                    new ColumnListItem({
                        cells: cells
                    })

                );

            });

            this.byId("dataDialog").open();

        },

        onCloseDialog() {

            this.byId("dataDialog").close();

        }
    });
});