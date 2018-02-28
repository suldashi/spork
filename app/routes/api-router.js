let router = require('express').Router();
const AuthRouter = require("./auth-router");
const UserRouter = require("./user-router");
const EntryRouter = require("./entry-router");

router.use("/auth", AuthRouter);
router.use('/user', UserRouter);
router.use('/entry', EntryRouter);

module.exports = router;