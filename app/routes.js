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
				res.send(JSON.stringify({needsActivation:true}));	
			}
		}
		else {
			res.status(400).send(JSON.stringify({error:"invalid credentials"}));
		}
	});

	app.post("/register",async (req,res) => {
		let user = await userService.getUserByCredentials(req.body.username,req.body.password);
		if(user) {
			res.status(400).send(JSON.stringify({error:"user already exists"}));
		}
		else {
			user = await userService.addUser(req.body.username,req.body.password);
			res.status(200).send();
		}
	});
});
