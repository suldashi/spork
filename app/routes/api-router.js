let router = require('express').Router();
const AuthRouter = require("./auth-router");
const UserRouter = require("./user-router");

router.use("/auth", AuthRouter);
router.use('/user', UserRouter);

module.exports = router;