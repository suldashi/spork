const CryptoService = require("../../app/crypto-service");
const moment = require("moment");

let sessions = {};

let sessionCtr = 1;

const SessionRepository = {
    setSession: async (userId) => {
        if(userId) {
            let sessionId = CryptoService.getRandomBytes();
            let sessionIdHash = await CryptoService.fastHash(sessionId);
            sessions[sessionIdHash] = {
                id:sessionCtr++,
                user_id:userId,
                session_id:sessionIdHash,
                expiration_time:moment().add(1,"month").toISOString(),
                is_invalidated: false
            };
            return sessionId;
        }
        return null;
    },

    getUserId: async (sessionId) => {
        let sessionIdHash = await CryptoService.fastHash(sessionId);
        let session = sessions[sessionIdHash];
        if(sessionId && session && !session.is_invalidated && moment(session.expiration_time).isAfter(moment())) {
            return sessions[sessionIdHash].user_id;
        }
        return null;
    },

    invalidateSession: async (sessionId) => {
        let sessionIdHash = await CryptoService.fastHash(sessionId);
        let session = sessions[sessionIdHash];
        if(sessionId && session && !session.is_invalidated && moment(session.expiration_time).isAfter(moment())) {
            session.is_invalidated = true;
            return true;
        }
        return false;
    }
};

module.exports = SessionRepository;
