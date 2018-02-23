let EntryRepository = require("./entry-repository");

class EntryService {
	constructor(opts = {}) {
		this.entryRepository = opts.entryRepository?opts.entryRepository:EntryRepository;
	}

	async addEntry(userId,timestamp,distance,time) {
		return this.entryRepository.addEntry(userId,timestamp,distance,time);
	}
}

module.exports = EntryService;