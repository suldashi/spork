'use strict';

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require('body-parser')

const initHttpRoutes = require("./routes");

const port = 8088;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("x-powered-by",false);

initHttpRoutes(app);

server.listen(port);
console.log("started on " + port);