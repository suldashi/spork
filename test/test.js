const expect = require('chai').expect;
const sinon = require('sinon');
const UserService = require("../app/user/user-service");

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
		firstUserId = await UserService.addUser(userToInsert.username,userToInsert.password);
		let userModel = await UserService.getUserByUsername(userToInsert.username);
		expect(firstUserId).to.be.exist;
		expect(userModel).to.deep.equal({
			id:firstUserId,
			username:userToInsert.username,
			password:userToInsert.password,
			activated:false
		});
	});
	it("second user should be added successfully",async () => {
		secondUserId = await UserService.addUser(secondUserToInsert.username,secondUserToInsert.password);
		let userModel = await UserService.getUserByUsername(secondUserToInsert.username);
		expect(secondUserId).to.be.exist;
		expect(userModel).to.deep.equal({
			id:secondUserId,
			username:secondUserToInsert.username,
			password:secondUserToInsert.password,
			activated:false
		});
	});
	it("same user cannot be added twice",async () => {
		let result = await UserService.addUser(userToInsert.username,userToInsert.password);
		expect(result).to.be.false;
	});
});

describe("UserService.getUserByUsername", () => {
	let username = userToInsert.username;
	it("there should be a user returned",async () => {
		let result = await UserService.getUserByUsername(username);
		expect(result).to.deep.equals({
			id:firstUserId,
			username:userToInsert.username,
			password:userToInsert.password,
			activated:false
		});
	});
	it("the result should be null if username is not found",async () => {
		let result = await UserService.getUserByUsername("NONEXISTENT");
		expect(result).to.be.null;
	});
});

describe("UserService.getUserById", () => {
	let userId = firstUserId;
	it("there should be a user returned",async () => {
		let result = await UserService.getUserById(firstUserId);
		expect(result).to.deep.equals({
			id:firstUserId,
			username:userToInsert.username,
			password:userToInsert.password,
			activated:false
		});
	});
	it("the result should be null if no user is found with that id",async () => {
		let result = await UserService.getUserById(0);
		expect(result).to.be.null;
	});
});

describe("UserService.getUserByCredentials", () => {
	it("there should be a user returned",async () => {
		let result = await UserService.getUserByCredentials(userToInsert.username,userToInsert.password);
		expect(result).to.deep.equals({
			id:firstUserId,
			username:userToInsert.username,
			password:userToInsert.password,
			activated:false
		});
	});
	it("the result should be null if credentials were wrong",async () => {
		let result = await UserService.getUserByCredentials(userToInsert.username,null);
		expect(result).to.be.null;
	});
});

describe("UserService.removeUser", () => {
	it("first user should be removed",async () => {
		let result = await UserService.removeUser(firstUserId);
		expect(result).to.be.true;
	});
	it("second user should be removed",async () => {
		let result = await UserService.removeUser(secondUserId);
		expect(result).to.be.true;
	});
	it("nonexistent user cannot be removed",async () => {
		let result = await UserService.removeUser(0);
		expect(result).to.be.false;
	});
});