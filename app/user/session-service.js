let SessionRepository = require("./session-repository");
let CryptoService = require("../crpyto-service");

class SessionService {
	constructor(sessionRepository) {
		this.sessionRepository = sessionRepository?sessionRepository:SessionRepository;
	}
}

module.exports = SessionService;