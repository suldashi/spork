const CryptoService = require("../crypto-service");
const moment = require("moment");

const db = require("../db");

const SessionRepository = {
    setSession: async (userId) => {
        if(userId) {
            let sessionId = CryptoService.getRandomBytes();
            let sessionIdHash = await CryptoService.fastHash(sessionId);
            await db.any('INSERT INTO "user_session" ("user_id","session_id","expiration_time","is_invalidated") VALUES ($1,$2,$3,$4)',[userId,sessionIdHash,moment().add(1,"month").toISOString(),false]);
            return sessionId;
        }
        return null;
    },

    getUserId: async (sessionId) => {
        let sessionIdHash = await CryptoService.fastHash(sessionId);
        let session = await db.oneOrNone('SELECT * FROM "user_session" WHERE "session_id" = $1',sessionIdHash);
        if(sessionId && session && !session.is_invalidated && moment(session.expiration_time).isAfter(moment())) {
            return session.user_id;
        }
        return null;
    },

    invalidateSession: async (sessionId) => {
        let sessionIdHash = await CryptoService.fastHash(sessionId);
        let session = await db.oneOrNone('SELECT * FROM "user_session" WHERE "session_id" = $1',sessionIdHash);
        if(sessionId && session && !session.is_invalidated && moment(session.expiration_time).isAfter(moment())) {
            await db.any('UPDATE "user_session" SET "is_invalidated" = true WHERE id = $1',session.id);
            return true;
        }
        return false;
    }
};

module.exports = SessionRepository;
