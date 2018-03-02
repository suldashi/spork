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

	async getEntriesByUserId(userId) {
		let entries = await this.entryRepository.getEntriesByUserId(userId);
		return entries.map((el) => {return {
			id: el.id,
			userId: el.user_id,
			distance:el.distance_in_meters,
			duration:el.duration_in_secs,
			location:el.location,
			timestamp:el.timestamp
		}});
	}

	async getEntriesBetweenDates(userId,lowerDate,upperDate) {
		let entries = await this.entryRepository.getEntriesBetweenDates(userId,lowerDate,upperDate);
		return entries.map((el) => {return {
			id: el.id,
			userId: el.user_id,
			distance:el.distance_in_meters,
			duration:el.duration_in_secs,
			location:el.location,
			timestamp:el.timestamp
		}});
	}

	async deleteEntry(entryId) {
		return this.entryRepository.deleteEntry(entryId);
	}

	async editEntry(entryId,timestamp,distance,duration,location) {
		return this.entryRepository.editEntry(entryId,timestamp,distance,duration,location);
	}
}

module.exports = EntryService;