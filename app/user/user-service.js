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
				activationCodeGenerator:user.activation_code_generator,
				isUserManager:user.is_user_manager,
				isAdmin:user.is_admin
			};
		}
		return null;
	}

	async getAll() {
		let users = await this.userRepository.getAll();
		if(users) {
			return users.map((el) => {return {
				id:el.id,
				username:el.username,
				activated:el.is_active,
				activationCodeGenerator:el.activation_code_generator,
				isUserManager:el.is_user_manager,
				isAdmin:el.is_admin
			}});
		}
		return [];
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
					activationCodeGenerator:user.activation_code_generator,
					isUserManager:user.is_user_manager,
					isAdmin:user.is_admin
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
				activationCodeGenerator:user.activation_code_generator,
				isUserManager:user.is_user_manager,
				isAdmin:user.is_admin
			};
		}
		return null;
	}

	async changePassword(userId,password) {
		let hashedPassword = await CryptoService.hashPassword(password);
		return this.userRepository.changePassword(userId,hashedPassword);
	}

	async getUserByActivationCodeGenerator(activationCodeGenerator) {
		return this.userRepository.getUserByActivationCodeGenerator(activationCodeGenerator);
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

	async makeUserAdmin(userId) {
		return this.userRepository.makeUserAdmin(userId);
	}

	async makeUserUserManager(userId) {
		return this.userRepository.makeUserUserManager(userId);
	}

	async makeUserRegular(userId) {
		return this.userRepository.makeUserRegular(userId);
	}
}

module.exports = UserService;