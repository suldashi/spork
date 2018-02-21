let UserRepository = require("./user-repository");

class UserService {
	constructor(userRepository) {
		this.userRepository = userRepository?userRepository:UserRepository;
	}
	async getUserByUsername(username) {
		let user = await this.userRepository.getByUsername(username);
		if(user) {
			return {
				id:user.id,
				username:user.username,
				password:user.password,
				activated:user.is_active
			};
		}
		return null;
	}

	async getUserByCredentials(username,password) {
		let user = await this.userRepository.getByUsername(username);
		if(user && user.password === password) {
			return {
				id:user.id,
				username:user.username,
				password:user.password,
				activated:user.is_active
			};
		}
		return null;
	}

	async getUserById(userId) {
		let user = await this.userRepository.getById(userId);
		if(user) {
			return {
				id:user.id,
				username:user.username,
				password:user.password,
				activated:user.is_active
			};
		}
		return null;
	}

	async addUser(username,password) {
		let possibleUser = await this.userRepository.getByUsername(username);
		if(!possibleUser) {
			return this.userRepository.addUser(username,password,"foo","bar");
		}
		return false;
	}

	async removeUser(id) {
		return this.userRepository.removeUser(id);
	}
}

module.exports = UserService;