let router = require('express').Router();

const UserService = require("../user/user-service");
const SessionService = require("../session/session-service");
const EmailService = require("../email-service");

const userService = new UserService();
const sessionService = new SessionService();

router.post("/login",async (req,res) => {
    let user = await userService.getUserByCredentials(req.body.username,req.body.password);
    if(user) {
        if(user.activated) {
            let authToken = await sessionService.setSession(user.id);
            res.send(JSON.stringify({authToken}));	
        }
        else {
            res.send(JSON.stringify({needsActivation:true,activationCodeGenerator:user.activationCodeGenerator}));	
        }
    }
    else {
        res.status(400).send(JSON.stringify({error:"invalid credentials"}));
    }
});

router.post('/sendActivationCode', async (req,res) => {
    let result = await userService.generateActivationCode(req.body.activationCodeGenerator);
    if(result) {
        let user = await userService.getUserByActivationCodeGenerator(req.body.activationCodeGenerator);
        try {
            let emailConfirmation = await EmailService.sendActivationLink(result,user.username);
            res.send(JSON.stringify({}));
        }
        catch(err) {
            console.log("confirmation email could not be sent. Reason:",err);
            res.send(JSON.stringify({activationCode:result}));
        }
    }
    else {
        res.status(400).send(JSON.stringify({error:"invalid activation code generator"}));
    }	
});

router.post('/activate', async (req,res) => {
    let result = await userService.activateUser(req.body.activationCode);
    if(result) {
        res.status(200).send({});
    }
    else {
        res.status(400).send({error:"invalid activation code"});
    }
});

router.post("/register",async (req,res) => {
    let user = await userService.getUserByUsername(req.body.username);
    if(user) {
        res.status(400).send(JSON.stringify({error:"user already exists"}));
    }
    else {
        user = await userService.addUser(req.body.username,req.body.password);
        let userModel = await userService.getUserById(user);
        let activationCode = await userService.generateActivationCode(userModel.activationCodeGenerator);
        try {
            let emailConfirmation = await EmailService.sendActivationLink(activationCode,req.body.username);
        }
        catch(err) {
            console.log("confirmation email could not be sent. Reason:",err);
        }
        res.status(200).send({});
    }
});

router.put("/changePassword",async (req,res) => {
    let user = await userService.getUserById(req.body.userId);
    if(!user) {
        res.status(400).send(JSON.stringify({error:"no such user"}));
    }
    else {
        result = await userService.changePassword(req.body.userId,req.body.password);
        res.status(200).send({});
    }
});

module.exports = router;