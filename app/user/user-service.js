

let users = {
	1:{
		id:1,
		username:"ermirsuldashi@gmail.com",
		password:"foo",
		activated:true
	},
	2:{
		id:2,
		username:"summer@gmail.com",
		password:"ruby",
		activated:false
	}
};

let UserRepository = require("./user-repository");
//let UserRepository = require("./user-repository-mock");

class UserService {
	async getUserByUsername(username) {
		return UserRepository.getByUsername(username);
	}

	async getUserByCredentials(username,password) {
		let user = await this.getUserByUsername(username);
		if(user && user.password === password) {
			return user;
		}
		return null;
	}

	async getUserById(userId) {
		return UserRepository.getById(userId);
	}

	async addUser(username,password) {
		let possibleUser = await this.getUserByUsername(username);
		if(!possibleUser) {
			return UserRepository.addUser(username,password,"foo","bar");
		}
		return false;
	}

	async removeUser(id) {
		return UserRepository.removeUser(id);
	}
}

module.exports = new UserService();