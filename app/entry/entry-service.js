let EntryRepository = require("./entry-repository");

class EntryService {
	constructor(opts = {}) {
		this.entryRepository = opts.entryRepository?opts.entryRepository:EntryRepository;
	}

	async addEntry(userId,timestamp,distance,duration,location) {
		return this.entryRepository.addEntry(userId,timestamp,distance,duration,location);
	}

	async getEntryById(entryId) {
		let entry = await this.entryRepository.getEntryById(entryId);
		if(entry) {
			return {
				id:entry.id,
				userId:entry.user_id,
				timestamp:entry.timestamp,
				distance:entry.distance_in_meters,
				duration:entry.duration_in_secs,
				location:entry.location
			}
		}
		return null;
	}
}

module.exports = EntryService;