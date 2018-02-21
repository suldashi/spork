let users = {
	1:{
		id:1,
		username:"ermirsuldashi@gmail.com",
		password:"foo",
        activation_link_generator:"foo",
        salt:"foo",
		is_active:true
	},
	2:{
		id:2,
		username:"summer@gmail.com",
		password:"ruby",
        activation_link_generator:"foo",
        salt:"foo",
		is_active:false
	}
};

let userCtr = 3;

const UserRepository = {
    getByUsername: async (username) => {
        let targetUser = Object.values(users).find((el) => el.username === username);
		return targetUser?targetUser:null;
    },

    getById: async (userId) => {
        let targetUser = users[userId];
		return targetUser?targetUser:null;
    },

    addUser: async (username,password,activationLinkGenerator,salt) => {
        users[userCtr] = {
            id:userCtr,
            username,
            password,
            is_active:false,
            activation_link_generator:activationLinkGenerator,
            salt,
        };
        return userCtr++;
    },

    removeUser: async (userId) => {
        if(users[userId]) {
            delete users[userId];
            return true;
        }
        return false;
    }
};

module.exports = UserRepository;
