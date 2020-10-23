const { createUser,login,viewUsers, test } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/toke_validation");

router.get("/test",test)
router.post("/register",createUser);
router.post("/login",login);
router.get("/view",checkToken,viewUsers);

module.exports = router;