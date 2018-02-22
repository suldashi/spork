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

	app.post("/login",(req,res) => {
		let user = userService.getUserByCredentials(req.body.username,req.body.password);
		if(user) {
			let authToken = uuid();
			userMap[authToken] = user.id;
			if(user.activated) {
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
});
