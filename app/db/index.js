const pgp = require("pg-promise")();
var dbconfig = require("../config").db;
var conString = `postgres://${dbconfig.username}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}/${dbconfig.dbName}`;
module.exports = pgp(conString);