let router = require('express').Router();

const UserService = require("../user/user-service");
const userService = new UserService();

const authMiddleware = require("./auth-middleware");
const usrMgrMiddleware = require("./user-mgr-middleware");
const adminMiddleware = require("./admin-middleware");

router.use(authMiddleware);

router.get("/",async (req,res) => {
    let user = await userService.getUserById(req.userId);
    res.send({user});
});

router.get("/all",usrMgrMiddleware,async (req,res) => {
    let users = await userService.getAll();
    res.send({users});
});

router.put("/changeRole",usrMgrMiddleware,async (req,res) => {
    let user = await userService.getUserById(req.body.userId);
    if(user) {
        if(req.body.newRole === "admin") {
            await userService.makeUserAdmin(req.body.userId);
            res.send({});
        }
        else if(req.body.newRole === "userManager") {
            await userService.makeUserUserManager(req.body.userId);
            res.send({});
        }
        else if(req.body.newRole === "regular") {
            await userService.makeUserRegular(req.body.userId);
            res.send({});
        }
        else {
            res.status(400).send({error:"no such user"});    
        }
    }
    else {
        res.status(400).send({error:"no such user"});
    }
});

router.delete("/delete",usrMgrMiddleware,async (req,res) => {
    let result = await userService.removeUser(req.body.userId);
    res.send({result});
});

module.exports = router;