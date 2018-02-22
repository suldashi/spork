const expect = require('chai').expect;
const sinon = require('sinon');
const CryptoService = require("../app/crypto-service");

describe("CryptoService.hashPassword() and CryptoService.comparePassword()", async () => {
    let password = CryptoService.getRandomBytes();
    let firstHashValue = null;
    let secondHashValue = null;
    it("we should get a hash from hashPassword() with a random password", async () => {
        firstHashValue = await CryptoService.hashPassword(password);
        expect(firstHashValue).to.be.a("string");
    });
    it("the generated hash should be confirmed", async () => {
        let isCorrectPassword = await CryptoService.comparePassword(password,firstHashValue);
        expect(isCorrectPassword).to.be.true;
    });
    it("same password hashed twice should yield different hashes", async () => {
        secondHashValue = await CryptoService.hashPassword(password);
        expect(firstHashValue).to.not.be.equal(secondHashValue);
    });
})

describe("CryptoService.fastHash()", async () => {
    let password = CryptoService.getRandomBytes();
    let firstHashValue = null;
    let secondHashValue = null;
    it("we should get a hash from fastHash() with a random password", async () => {
        firstHashValue = CryptoService.fastHash(password);
        expect(firstHashValue).to.be.a("string");
    });
    it("same password hashed twice should yield the same hash as before", async () => {
        secondHashValue = CryptoService.fastHash(password);
        expect(firstHashValue).to.be.equal(secondHashValue);
    });
})