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

    addUser: async (username,password,activationLinkGenerator,salt) => {
        var resultRow = await db.one('INSERT INTO "user" ("username","password","is_active","activation_link_generator","salt") VALUES ($1,$2,$3,$4,$5) RETURNING id',[username,password,false,activationLinkGenerator,salt]);
        return resultRow.id;
    },

    removeUser: async (id) => {
        let successfullyRemoved = false;
        try {
            await db.one('DELETE FROM "user" WHERE "id" = $1 RETURNING id',id);
            successfullyRemoved = true;
        }
        catch(err) {

        }
        return successfullyRemoved;
    }
};

module.exports = UserRepository;
