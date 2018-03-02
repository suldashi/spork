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

let distance = 5000;	//meters
let duration = 30*60;	//30 minutes in seconds
let location = "somewhere";	//a gps coord should be here

describe("EntryService.addEntry()", () => {
	let userId = null;
	before("creating and activating the user", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
	});
	it("the entry should be added successfully",async () => {
		let result = await entryService.addEntry(userId,moment(),distance,duration,location);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.getEntryById()", () => {
	let entryId = null;
	let userId = null;
	before("creating and activating the user", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
		entryId = await entryService.addEntry(userId,moment(),distance,duration,location);
	});
	it("the entry should be added successfully",async () => {
		let entry = await entryService.getEntryById(entryId);
		expect(entry).to.have.deep.keys([
			"id",
			"userId",
			"distance",
			"duration",
			"location",
			"timestamp"
		]);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.getEntriesByUserId() multiple entries", () => {
	let userId = null;
	before("creating and activating the user, adding some entries", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
		await Promise.all([entryService.addEntry(userId,moment(),distance,duration,location),
		entryService.addEntry(userId,moment(),distance,duration,location),
		entryService.addEntry(userId,moment(),distance,duration,location),
		entryService.addEntry(userId,moment(),distance,duration,location)])
	});
	it("there should be 4 entries received, they should have the correct format",async () => {
		let entries = await entryService.getEntriesByUserId(userId);
		expect(entries.length).to.equals(4);
		expect(entries[0]).to.have.deep.keys([
			"id",
			"userId",
			"distance",
			"duration",
			"location",
			"timestamp"
		]);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.getEntriesByUserId() single entry", () => {
	let userId = null;
	before("creating and activating the user, one entry", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
		await entryService.addEntry(userId,moment(),distance,duration,location);
	});
	it("there should be an array on one entry received, with the correct format",async () => {
		let entries = await entryService.getEntriesByUserId(userId);
		expect(entries.length).to.equals(1);
		expect(entries[0]).to.have.deep.keys([
			"id",
			"userId",
			"distance",
			"duration",
			"location",
			"timestamp"
		]);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.getEntriesByUserId() no entries", () => {
	let userId = 0;	//no user with id 0
	it("there should be an array of zero entries received",async () => {
		let entries = await entryService.getEntriesByUserId(userId);
		expect(entries.length).to.equals(0);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.getEntriesBetweenDates() multiple entries", () => {
	let userId = null;
	let firstEntryId = null;
	let secondEntryId = null;
	let thirdEntryId = null;
	let fourthEntryId = null;
	before("creating and activating the user, adding some entries", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
		firstEntryId = await entryService.addEntry(userId,moment().add(-1,"M"),distance,duration,location);
		secondEntryId = await entryService.addEntry(userId,moment().add(-3,"M"),distance,duration,location);
		thirdEntryId = await entryService.addEntry(userId,moment().add(-5,"M"),distance,duration,location);
		fourthEntryId = await entryService.addEntry(userId,moment().add(-7,"M"),distance,duration,location);
	});
	it("there should be 2 entries received",async () => {
		let entries = await entryService.getEntriesBetweenDates(userId,moment().add(-6,"M"),moment().add(-2,"M"));
		expect(entries.length).to.equals(2);
		expect(entries[0].id).to.equal(secondEntryId);
		expect(entries[1].id).to.equal(thirdEntryId);
	});
	it("there should be 4 entries received",async () => {
		let entries = await entryService.getEntriesBetweenDates(userId,moment().add(-1,"Y"),moment());
		expect(entries.length).to.equals(4);
		expect(entries[0].id).to.equal(firstEntryId);
		expect(entries[1].id).to.equal(secondEntryId);
		expect(entries[2].id).to.equal(thirdEntryId);
		expect(entries[3].id).to.equal(fourthEntryId);
	});
	it("there should be 0 entries received, no entries on those dates",async () => {
		let entries = await entryService.getEntriesBetweenDates(userId,moment().add(-2,"Y"),moment().add(-1,"Y"));
		expect(entries.length).to.equals(0);
	});
	it("there should be 0 entries received, non-overlapping dates",async () => {
		let entries = await entryService.getEntriesBetweenDates(userId,moment().add(-1,"Y"),moment().add(-2,"Y"));
		expect(entries.length).to.equals(0);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.deleteEntry()", () => {
	let userId = null;
	let entryId = null;
	before("creating and activating the user, one entry", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
		entryId = await entryService.addEntry(userId,moment(),distance,duration,location);
	});
	it("deleting the entry should be successful",async () => {
		let result = await entryService.deleteEntry(entryId);
		let entry = await entryService.getEntryById(entryId);
		expect(result).to.be.true;
		expect(entry).to.be.null;
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});

describe("EntryService.editEntry()", () => {
	let userId = null;
	let entryId = null;

	let newDuration = 1234;
	let newDistance = 4321;
	let newLocation = "over there";

	before("creating and activating the user, one entry", async () => {
		userId = await userService.addUser(userToInsert.username,userToInsert.password);
		let user = await userService.getUserById(userId);
		let activationCode = await userService.generateActivationCode(user.activationCodeGenerator);
		let result = await userService.activateUser(activationCode);
		entryId = await entryService.addEntry(userId,moment(),distance,duration,location);
	});
	it("editing the entry should be successful",async () => {
		let result = await entryService.editEntry(entryId,moment(),newDistance,newDuration,newLocation);
		let entry = await entryService.getEntryById(entryId);
		expect(result).to.be.true;
		expect(entry.duration).to.equal(newDuration);
		expect(entry.distance).to.equal(newDistance);
		expect(entry.location).to.equal(newLocation);
	});
	after("deleting the user", async () => {
		await userService.removeUser(userId);
	});
});