const express = require("express");
const path = require("path");

const APIRouter = require("./api-router");

module.exports = ((app) => {
	app.use('/public', express.static(path.resolve(__dirname,"..","..",'public')));

	app.use('/api', APIRouter);

	app.get("*",(req,res) => {
		res.sendFile(path.resolve("public/index.html"));
	});
});
