let UserRepository = require("./user-repository");
let CryptoService = require("../crypto-service");

class UserService {
	constructor(opts = {}) {
		this.userRepository = opts.userRepository?opts.userRepository:UserRepository;
	}
	async getUserByUsername(username) {
		let user = await this.userRepository.getByUsername(username);
		if(user) {
			return {
				id:user.id,
				username:user.username,
				activated:user.is_active,
				activationCodeGenerator:user.activation_code_generator
			};
		}
		return null;
	}

	async getUserByCredentials(username,password) {
		let user = await this.userRepository.getByUsername(username);
		if(user) {
			let isCorrectPassword = await CryptoService.comparePassword(password,user.password)
			if(isCorrectPassword) {
				return {
					id:user.id,
					username:user.username,
					activated:user.is_active,
					activationCodeGenerator:user.activation_code_generator
				};
			}
		}
		return null;
	}

	async getUserById(userId) {
		let user = await this.userRepository.getById(userId);
		if(user) {
			return {
				id:user.id,
				username:user.username,
				activated:user.is_active,
				activationCodeGenerator:user.activation_code_generator
			};
		}
		return null;
	}

	async addUser(username,password) {
		let possibleUser = await this.userRepository.getByUsername(username);
		if(!possibleUser) {
			let passwordHash = await CryptoService.hashPassword(password);
			let activationCodeGenerator = CryptoService.getRandomBytes();
			return this.userRepository.addUser(username,passwordHash,activationCodeGenerator);
		}
		return false;
	}

	async removeUser(id) {
		return this.userRepository.removeUser(id);
	}

	async generateActivationCode(activationCodeGenerator) {
		return this.userRepository.generateActivationCode(activationCodeGenerator);
	}

	async activateUser(activationCode) {
		return this.userRepository.activateUser(activationCode);
	}
}

module.exports = UserService;