const expect = require('chai').expect;
const sinon = require('sinon');
const UserService = require("../app/user/user-service");

describe("UserService.getUserByUsername", () => {
	let username = "ermirsuldashi@gmail.com";
	it("there should be a user returned",() => {
		let result = UserService.getUserByUsername(username);
		expect(result).to.deep.equals({
			id:1,
			username:"ermirsuldashi@gmail.com",
			password:"foo",
			activated:true
		});
	});
	it("the result should be null if username is not found",() => {
		let result = UserService.getUserByUsername("NONEXISTENT");
		expect(result).to.be.null;
	});
});

describe("UserService.getUserById", () => {
	let userId = 1;
	it("there should be a user returned",() => {
		let result = UserService.getUserById(1);
		expect(result).to.deep.equals({
			id:1,
			username:"ermirsuldashi@gmail.com",
			password:"foo",
			activated:true
		});
	});
	it("the result should be null if no user is found with that id",() => {
		let result = UserService.getUserById(0);
		expect(result).to.be.null;
	});
});

describe("UserService.getUserByCredentials", () => {
	let username = "ermirsuldashi@gmail.com";
	let password = "foo";
	it("there should be a user returned",() => {
		let result = UserService.getUserByCredentials(username,password);
		expect(result).to.deep.equals({
			id:1,
			username:"ermirsuldashi@gmail.com",
			password:"foo",
			activated:true
		});
	});
	it("the result should be null if credentials were wrong",() => {
		let result = UserService.getUserByCredentials(username,null);
		expect(result).to.be.null;
	});
});

describe("UserService.addUser", () => {
	let username = "foo@bar.com";
	let secondUser = "foo@baz.com";
	let password = "baz";
	it("the user should be added successfully",() => {
		let result = UserService.addUser(username,password);
		let userModel = UserService.getUserByUsername(username);
		expect(result).to.be.exist;
		expect(userModel).to.deep.equal({
			id:result,
			username,
			password,
			activated:false
		});
	});
	it("second user should be added successfully",() => {
		let result = UserService.addUser(secondUser,password);
		let userModel = UserService.getUserByUsername(secondUser);
		expect(result).to.be.exist;
		expect(userModel).to.deep.equal({
			id:result,
			username:secondUser,
			password,
			activated:false
		});
	});
	it("same user cannot be added twice",() => {
		let result = UserService.addUser(username,password);
		let userModel = UserService.getUserByUsername(username);
		expect(result).to.be.false;
	});
});