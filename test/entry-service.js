const expect = require('chai').expect;
const sinon = require('sinon');
const CryptoService = require("../app/crypto-service");

const UserService = require("../app/user/user-service");
const UserRepository = require("../mocks/user/user-repository");

const EntryService = require("../app/entry/entry-service");
const EntryRepository = require("../mocks/entry/entry-repository");

const moment = require("moment");

const userService = new UserService({
	userRepository:UserRepository
});

const entryService = new EntryService({
	entryRepository:EntryRepository
});

let userToInsert = {
	username:CryptoService.getRandomBytes(),
	password:CryptoService.getRandomBytes()
};

let userId = null;

describe("EntryService.addEntry", () => {
	before("creating and activating the user", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
	});
	it("the entry should be added successfully",async () => {
		let result = await entryService.addEntry(userId,moment(),5,30*60);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});