let router = require('express').Router();

const UserService = require("../user/user-service");
const userService = new UserService();

const authMiddleware = require("./auth-middleware");

router.use(authMiddleware);

router.get("/",async (req,res) => {
    let user = await userService.getUserById(req.userId);
    res.send({user});
});

module.exports = router;