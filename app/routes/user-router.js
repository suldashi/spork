let router = require('express').Router();

const UserService = require("../user/user-service");
const SessionService = require("../session/session-service");

const userService = new UserService();
const sessionService = new SessionService();

router.use(async (req,res,next) => {
    let bearer = req.header("Authorization");
    if(bearer) {
        bearer = bearer.split("Bearer ")[1];
        let userId = await sessionService.getUserId(bearer);
        req.userId = userId;
    }
    else {
        req.userId = null;
    }
    next();
});

router.get("/",async (req,res) => {
    let user = await userService.getUserById(req.userId);
    res.send({user});
});

module.exports = router;