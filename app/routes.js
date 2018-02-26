const express = require("express");
const path = require("path");
const uuid = require("uuid/v4");

const UserService = require("./user/user-service");
const SessionService = require("./session/session-service");

const userService = new UserService();
const sessionService = new SessionService();


module.exports = ((app) => {
	app.use('/public', express.static(path.resolve(__dirname,"..",'public')));

	app.get("*",(req,res) => {
		res.sendFile(path.resolve("public/index.html"));
	});

	app.post("/login",async (req,res) => {
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

	app.post('/sendActivationCode', async (req,res) => {
		let result = await userService.generateActivationCode(req.body.activationCodeGenerator);
		if(result) {
			res.send(JSON.stringify({activationCode:result}));	
		}
		else {
			res.status(400).send(JSON.stringify({error:"invalid activation code generator"}));
		}	
	});

	app.post('/activate', async (req,res) => {
		let result = await userService.activateUser(req.body.activationCode);
		if(result) {
			res.status(200).send({});
		}
		else {
			res.status(400).send({error:"invalid activation code"});
		}
	});

	app.post("/register",async (req,res) => {
		let user = await userService.getUserByCredentials(req.body.username,req.body.password);
		if(user) {
			res.status(400).send(JSON.stringify({error:"user already exists"}));
		}
		else {
			user = await userService.addUser(req.body.username,req.body.password);
			res.status(200).send({});
		}
	});
});
