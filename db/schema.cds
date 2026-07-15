// We aren't storing uploaded business data here. This table is only for upload history.

namespace upload;

entity UploadLogs {
    key ID : UUID;
    objectType : String;
    fileName : String;
    uploadedBy : String;
    status : String;
    message : String;
    uploadedJson : LargeString;
    createdAt : Timestamp;
}