let SessionRepository = require("./session-repository");
let CryptoService = require("../crypto-service");

class SessionService {
	constructor(opts = {}) {
		this.sessionRepository = opts.sessionRepository?opts.sessionRepository:SessionRepository;
	}

	setSession(userId) {
		return this.sessionRepository.setSession(userId);
	}

	getUserId(sessionId) {
		return this.sessionRepository.getUserId(sessionId);
	}

	invalidateSession(sessionId) {
		return this.sessionRepository.invalidateSession(sessionId);
	}
}

module.exports = SessionService;