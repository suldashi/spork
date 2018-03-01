let entries = {};

let ctr = 1;

const EntryRepository = {
	addEntry: async (userId,timestamp,distance,duration,location) => {
		entries[ctr] = {
			id:ctr,
			user_id:userId,
			timestamp,
			distance_in_meters:distance,
			duration_in_secs:duration,
			location
		};
		return ctr++;
	},

	getEntryById: async (entryId) => {
		let entry = entries[entryId];
		if(entry) {
			return entry;
		}
		return null;
	},

	getEntriesByUserId: async (userId) => {
		let result = Object.values(entries).filter((el) => el.user_id === userId);
		return sort((l,r) => l.timestamp>r.timestamp,result);
	}
}

module.exports = EntryRepository;