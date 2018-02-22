const expect = require('chai').expect;
const sinon = require('sinon');
const UserService = require("../app/user/user-service");
const SessionService = require("../app/user/session-service");
const UserRepository = require("../mocks/user/user-repository");
const SessionRepository = require("../mocks/user/session-repository");

const userService = new UserService(UserRepository);

let userToInsert = {
	username:"foo@bar.com",
	password:"qux"
};

let secondUserToInsert = {
	username:"bar@baz.com",
	password:"qux"
};

let firstUserId = null;
let secondUserId = null;

describe("UserService.addUser", () => {
	it("the user should be added successfully",async () => {
		firstUserId = await userService.addUser(userToInsert.username,userToInsert.password);
		let userModel = await userService.getUserByUsername(userToInsert.username);
		expect(firstUserId).to.be.exist;
		expect(userModel).to.deep.include({
			id:firstUserId,
			username:userToInsert.username,
			activated:false
		});
	});
	it("second user should be added successfully",async () => {
		secondUserId = await userService.addUser(secondUserToInsert.username,secondUserToInsert.password);
		let userModel = await userService.getUserByUsername(secondUserToInsert.username);
		expect(secondUserId).to.be.exist;
		expect(userModel).to.deep.include({
			id:secondUserId,
			username:secondUserToInsert.username,
			activated:false
		});
	});
	it("same user cannot be added twice",async () => {
		let result = await userService.addUser(userToInsert.username,userToInsert.password);
		expect(result).to.be.false;
	});
});

describe("UserService.getUserByUsername", () => {
	let username = userToInsert.username;
	it("there should be a user returned",async () => {
		let result = await userService.getUserByUsername(username);
		expect(result).to.deep.include({
			id:firstUserId,
			username:userToInsert.username,
			activated:false
		});
	});
	it("the result should be null if username is not found",async () => {
		let result = await userService.getUserByUsername("NONEXISTENT");
		expect(result).to.be.null;
	});
});

describe("UserService.getUserById", () => {
	let userId = firstUserId;
	it("there should be a user returned",async () => {
		let result = await userService.getUserById(firstUserId);
		expect(result).to.deep.include({
			id:firstUserId,
			username:userToInsert.username,
			activated:false
		});
	});
	it("the result should be null if no user is found with that id",async () => {
		let result = await userService.getUserById(0);
		expect(result).to.be.null;
	});
});

describe("UserService.getUserByCredentials", () => {
	it("there should be a user returned",async () => {
		let result = await userService.getUserByCredentials(userToInsert.username,userToInsert.password);
		expect(result).to.deep.include({
			id:firstUserId,
			username:userToInsert.username,
			activated:false
		});
	});
	it("the result should be null if credentials were wrong",async () => {
		let result = await userService.getUserByCredentials(userToInsert.username,null);
		expect(result).to.be.null;
	});
});

describe("UserService.getUserByCredentials", () => {
	it("there should be a user returned",async () => {
		let result = await userService.getUserByCredentials(userToInsert.username,userToInsert.password);
		expect(result).to.deep.include({
			id:firstUserId,
			username:userToInsert.username,
			activated:false
		});
	});
	it("the result should be null if credentials were wrong",async () => {
		let result = await userService.getUserByCredentials(userToInsert.username,null);
		expect(result).to.be.null;
	});
});

describe("UserService.generateActivationCode and UserService.activateUser", () => {
	let activationCode = null;
	it("activation code should be generated successfully on an existing, nonactivated user",async () => {
		let user = await userService.getUserById(firstUserId);
		activationCode = await userService.generateActivationCode(user.id,user.activationCodeGenerator);
		expect(activationCode).to.be.a("string");
	});
	it("user should be activated successfully",async () => {
		let result = await userService.activateUser(firstUserId,activationCode);
		expect(result).to.be.true;
	});
	it("activation code cannot be generated on an activated user",async () => {
		let user = await userService.getUserById(firstUserId);
		let result = await userService.generateActivationCode(user.id,user.activationCodeGenerator);
		expect(result).to.be.false;
	});
});

describe("UserService.removeUser", () => {
	it("first user should be removed",async () => {
		let result = await userService.removeUser(firstUserId);
		expect(result).to.be.true;
	});
	it("second user should be removed",async () => {
		let result = await userService.removeUser(secondUserId);
		expect(result).to.be.true;
	});
	it("expect removed user to not exist when requested",async () => {
		let user = await userService.getUserById(firstUserId);
		expect(user).to.be.null;
	});
	it("nonexistent user cannot be removed",async () => {
		let result = await userService.removeUser(0);
		expect(result).to.be.false;
	});
});