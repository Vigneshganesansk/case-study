const router = require("express").Router();
const { fileHome,fileUpload, fileDownload } = require("./file.controller");
const { checkToken } = require("../../auth/toke_validation");

router.get("/",checkToken,fileHome);
router.get("/upload",checkToken,fileUpload);
router.get("/download",checkToken, fileDownload);


module.exports = router;