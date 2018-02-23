const moment = require("moment");
const CryptoService = require("../crypto-service");

let db = require("../db");

const UserRepository = {
    getById: async (id) => {
        let user = await db.oneOrNone('SELECT * FROM "user" WHERE "id" = $1',id);
        if(user) {
            return user;
        }
        return null;
    },

    getByUsername: async (username) => {
        let user = await db.oneOrNone('SELECT * FROM "user" WHERE "username" = $1',username);
        if(user) {
            return user;
        }
        return null;
    },

    addUser: async (username,password,activationCodeGenerator) => {
        var resultRow = await db.one('INSERT INTO "user" ("username","password","is_active","activation_code_generator") VALUES ($1,$2,$3,$4) RETURNING id',[username,password,false,activationCodeGenerator]);
        return resultRow.id;
    },

    removeUser: async (id) => {
        let result = await db.oneOrNone('DELETE FROM "user" WHERE "id" = $1 RETURNING id',id);
        if(result && result.id === id) {
            return true;
        }
        return false;
    },

    generateActivationCode: async (activationCodeGenerator) => {
        let user = await db.oneOrNone('SELECT * FROM "user" WHERE "activation_code_generator" = $1 AND "is_active" = $2',[activationCodeGenerator,false]);
        if(user) {
            let activationCode = CryptoService.getRandomBytes();
            let expirationTime = moment().add(2,"h").toISOString();
            let result = await db.one('INSERT INTO "user_activation_code" ("user_id","activation_code","expiration_time") VALUES ($1,$2,$3) RETURNING id',[user.id,activationCode,expirationTime]);
            return activationCode;
        }
        return false;
    },

    activateUser: async (activationCode) => {
        let activationCodeInstance = await db.oneOrNone('SELECT * FROM "user_activation_code" WHERE "activation_code" = $1 AND "expiration_time" > now()',activationCode);
        if(activationCodeInstance) {
            await db.oneOrNone('UPDATE "user" SET "is_active" = true WHERE "id" = $1',activationCodeInstance.user_id);
            return true;  
        }
        return false;
    }
};

module.exports = UserRepository;
