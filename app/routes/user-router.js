let router = require('express').Router();

const UserService = require("../user/user-service");
const userService = new UserService();

const authMiddleware = require("./auth-middleware");
const usrMgrMiddleware = require("./user-mgr-middleware");

router.use(authMiddleware);

router.get("/",async (req,res) => {
    let user = await userService.getUserById(req.userId);
    res.send({user});
});

router.get("/all",usrMgrMiddleware,async (req,res) => {
    let users = await userService.getAll();
    res.send({users});
});

router.delete("/delete",usrMgrMiddleware,async (req,res) => {
    let result = await userService.removeUser(req.body.userId);
    res.send({result});
});

module.exports = router;