let EntryRepository = require("./entry-repository");

class EntryService {
	constructor(opts = {}) {
		this.entryRepository = opts.entryRepository?opts.entryRepository:EntryRepository;
	}

	async addEntry(userId,timestamp,distance,duration,location) {
		return this.entryRepository.addEntry(userId,timestamp,distance,duration,location);
	}
}

module.exports = EntryService;