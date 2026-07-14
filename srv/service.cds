using upload from '../db/schema';

service UploadService{

  entity UploadLogs  as projection on upload.UploadLogs;

    //For now, we're defining a simple UploadRecord for materials. Later, we'll make the upload payload more generic.
    type UploadRecord {
        Product  : String;
        BaseUnit : String;
    }

  action uploadAnyObject( 
    objectType : String,
    data : many UploadRecord

  ) returns String;

}