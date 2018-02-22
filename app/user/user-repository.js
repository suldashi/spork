const moment = require("moment");
const CryptoService = require("../crpyto-service");

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

    generateActivationCode: async (id,activationCodeGenerator) => {
        let user = await UserRepository.getById(id);
        if(user && !user.is_active && user.activation_code_generator === activationCodeGenerator) {
            let activationCode = CryptoService.getRandomBytes();
            let expirationTime = moment().add(2,"h").toISOString();
            let result = await db.one('INSERT INTO "user_activation_code" ("user_id","activation_code","expiration_time") VALUES ($1,$2,$3) RETURNING id',[id,activationCode,expirationTime]);
            return activationCode;
        }
        return false;
    },

    activateUser: async (id,activationCode) => {
        let activationCodes = await db.any('SELECT * FROM "user_activation_code" WHERE "user_id" = $1',id);
        let target = activationCodes.find(el => el.activation_code === activationCode && moment(el.expiration_time).isAfter(moment()));
        if(target) {
            await db.oneOrNone('UPDATE "user" SET "is_active" = true WHERE "id" = $1',id);
            return true;  
        }
        return false;
    }
};

module.exports = UserRepository;
