const { uploadFile, downloadFile } = require('./file.service');
module.exports = {
    fileHome: (req,res)=>{
        res.send("Lets upload/download");
    },
    fileUpload: (req,res)=>{
        var filename = req.query.filename;
        uploadFile(filename, (err,results)=>{
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            } else{
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })
    },
    fileDownload: (req, res)=>{
        var filename = req.query.filename;
        downloadFile(filename, res);
    }
}