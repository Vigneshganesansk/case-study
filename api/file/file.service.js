const connection = require('../../config/mongodb');
const assert = require('assert');
const gridfs = require('gridfs-stream');
const fs = require('fs');
const mongodb =require('mongodb');

module.exports = {
    uploadFile: (filename, callBack)=>{
        const uri = "mongodb+srv://admin:admin@cluster0.reyso.mongodb.net/test?retryWrites=true&w=majority";
        const dbName = "test";
        mongodb.MongoClient.connect(uri, function(error, client) {
            assert.ifError(error);
          
            const db = client.db(dbName);
          
            var bucket = new mongodb.GridFSBucket(db);
          
            fs.createReadStream(__dirname + "../../../uploads/" + filename).
              pipe(bucket.openUploadStream(filename)).
              on('error', function(error) {
                assert.ifError(error);
              }).
              on('finish', function() {
                console.log('done!');
                return res.status(200).send('File upload done');
                process.exit(0);
              });
          });
    },
    downloadFile: (filename, res)=>{
        // gridfs.mongo = mongoose.mongo;
        // var gfs = gridfs(connection.db);
        // gfs.exist({ filename: filename }, (err, file) => {
        //     if (err || !file) {
        //         return res.status(404).send('File Not Found');
        //     } 
        
        //     var readstream = gfs.createReadStream({ filename: filename });
        //     return readstream.pipe(res);            
        //     });
        const uri = "mongodb+srv://admin:admin@cluster0.reyso.mongodb.net/test?retryWrites=true&w=majority";
        const dbName = "test";
        mongodb.MongoClient.connect(uri, function(error, client) {
            assert.ifError(error);
          
            const db = client.db(dbName);
          
            var bucket = new mongodb.GridFSBucket(db);
          
            bucket.openDownloadStreamByName(filename).
            pipe(fs.createWriteStream('./output.txt')).
            on('error', function(error) {
              assert.ifError(error);
            }).
            on('finish', function() {
              console.log('done!');
              return res.status(200).send('File download done');
              process.exit(0);
            });
          });
  
    }
}