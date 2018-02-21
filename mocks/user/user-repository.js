const moment = require("moment");
const uuid = require("uuid/v4");

let users = {
};

let activationCodes = {

}

let activationCodeCtr = 1;
let userCtr = 1;

const UserRepository = {
    getByUsername: async (username) => {
        let targetUser = Object.values(users).find((el) => el.username === username);
		return targetUser?targetUser:null;
    },

    getById: async (userId) => {
        let targetUser = users[userId];
		return targetUser?targetUser:null;
    },

    addUser: async (username,password,activationCodeGenerator) => {
        users[userCtr] = {
            id:userCtr,
            username,
            password,
            is_active:false,
            activation_code_generator:activationCodeGenerator
        };
        return userCtr++;
    },

    removeUser: async (userId) => {
        if(users[userId]) {
            delete users[userId];
            return true;
        }
        return false;
    },

    generateActivationCode: async (userId,activationCodeGenerator) => {
        if(users[userId] && !users[userId].is_active && users[userId].activation_code_generator === activationCodeGenerator) {
            if(!activationCodes[userId]) {
                activationCodes[userId] = [];
            }
            let activationCode = uuid();
            activationCodes[userId].push({id:activationCodeCtr++,activation_code:activationCode,user_id:userId,expiration_time:moment().add(2,"h").toISOString()});
            return activationCode;
        }
        return false;
    },

    activateUser: async (userId,activationCode) => {
        if(users[userId] && !users[userId].is_active && activationCodes[userId] && activationCodes[userId].find((el) => el.activation_code === activationCode && moment(el.expiration_time).isAfter(moment()))) {
            users[userId].is_active = true;
            return true;
        }
        return false;
    }
};

module.exports = UserRepository;
