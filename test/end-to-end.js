const expect = require('chai').expect;
const sinon = require('sinon');
const axios = require("axios");

const CryptoService = require("../app/crypto-service");

describe("create user and log in using http", async () => {
    let password = CryptoService.getRandomBytes();
    let username = CryptoService.getRandomBytes();
    it("create a user", async () => {
        let result = await axios({
            method:"post",
            data: {username,password},
            url:"http://localhost:8088/api/auth/register",
            responseType:"json"});
    });
});