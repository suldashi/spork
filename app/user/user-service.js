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

class UserService {
	constructor() {
		this.userCtr = 3;
	}

	getUserByUsername(username) {
		let targetUser = Object.values(users).find((el) => el.username === username);
		return targetUser?targetUser:null;
	}

	getUserByCredentials(username,password) {
		let targetUser = Object.values(users).find((el) => el.username === username && el.password === password);
		return targetUser?targetUser:null;
	}

	getUserById(userId) {
		let targetUser = users[userId];
		return targetUser?targetUser:null;
	}

	addUser(username,password) {
		let possibleUser = this.getUserByUsername(username);
		if(!possibleUser) {
			users[this.userCtr] = {
				id:this.userCtr,
				username,
				password,
				activated:false
			}
			return this.userCtr++;
		}
		return false;
	}
}

module.exports = new UserService();