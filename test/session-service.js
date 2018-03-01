const expect = require('chai').expect;
const sinon = require('sinon');

const SessionService = require("../app/session/session-service");
const UserService = require("../app/user/user-service");
const CryptoService = require("../app/crypto-service");

const SessionRepository = require("../mocks/session/session-repository");
const UserRepository = require("../mocks/user/user-repository");



const sessionService = new SessionService({
    //sessionRepository:SessionRepository
});

const userService = new UserService({
	//userRepository:UserRepository
});

describe("SessionService.setSession() and SessionService.getUserId()", () => {
    let firstSessionId = null;
    let secondSessionId = null;
    let userId = null;
    let username = CryptoService.getRandomBytes();
    let password = CryptoService.getRandomBytes();
    before(async () => {
        userId = await userService.addUser(username,password);
    });
    it("we should be able to set a session if we have a proper id", async () => {
        firstSessionId = await sessionService.setSession(userId);
        expect(firstSessionId).to.be.a("string");
    });
    it("we should be able to set another session by the same user", async () => {
        secondSessionId = await sessionService.setSession(userId);
        expect(secondSessionId).to.be.a("string");
    });
    it("getUserId should return the proper user id when queried with the session ids", async () => {
        let firstUserId = await sessionService.getUserId(firstSessionId);
        let secondUserId = await sessionService.getUserId(secondSessionId);
        expect(firstUserId).to.equal(userId);
        expect(secondUserId).to.equal(userId);
    });
    it("we should not be able to set a session with an invalid user id", async () => {
        let firstResult = await sessionService.setSession(null);
        let secondResult = await sessionService.setSession(undefined);
        expect(firstResult).to.be.null;
        expect(secondResult).to.be.null;
    });
    after(async () => {
        userService.removeUser(userId);
    });
})

describe("SessionService.invalidateSession()", () => {
    let sessionId = null;
    let userId = null;
    let username = CryptoService.getRandomBytes();
    let password = CryptoService.getRandomBytes();
    before(async () => {
        userId = await userService.addUser(username,password);
    });
    it("we should be able to set a session if we have a proper id", async () => {
        sessionId = await sessionService.setSession(userId);
        expect(sessionId).to.be.a("string");
    });
    it("we should be able to get a valid session", async () => {
        let incomingUserId = await sessionService.getUserId(sessionId);
        expect(incomingUserId).to.equal(userId);
    });
    it("we should be able to invalidate a valid session", async () => {
        let result = await sessionService.invalidateSession(sessionId);
        expect(result).to.be.true;
    });
    it("after invalidation, we should not get a result from getUserId", async () => {
        let result = await sessionService.getUserId(sessionId);
        expect(result).to.be.null;
    });
    it("we should not be able to invalidate an invalid session", async () => {
        let result = await sessionService.invalidateSession(sessionId);
        expect(result).to.be.false;
    });
    after(async () => {
        userService.removeUser(userId);
    });
})