const CryptoService = require("../crypto-service");
const moment = require("moment");

const db = require("../db");

const EntryRepository = {
	addEntry: async (userId,timestamp,distance,duration,location) => {
		let result = await db.one('INSERT INTO "entry" ("user_id","timestamp","distance_in_meters","duration_in_secs","location") VALUES ($1,$2,$3,$4,$5) RETURNING id',[userId,timestamp,distance,duration,location]);
		return result.id;
	},

	getEntryById: async (entryId) => {
		let entry = await db.oneOrNone('SELECT * FROM "entry" WHERE "id" = $1 AND "deleted" = false',entryId);
		if(entry) {
			return entry;
		}
		return null;
	},

	getEntriesByUserId: async (userId) => {
		let entries = await db.any('SELECT * FROM "entry" WHERE "user_id" = $1 AND "deleted" = false ORDER BY "timestamp" DESC',userId);
		if(entries) {
			return entries;
		}
		return [];
	},

	getEntriesBetweenDates: async (userId,lowerDate,upperDate) => {
		let entries = await db.any('SELECT * FROM "entry" WHERE "user_id" = $1 AND "deleted" = false AND "timestamp" >= $2 AND "timestamp" <= $3 ORDER BY "timestamp" DESC',[userId,lowerDate,upperDate]);
		if(entries) {
			return entries;
		}
		return [];
	},

	deleteEntry: async (entryId) => {
		let result = await db.any('UPDATE "entry" SET "deleted" = true WHERE "id" = $1 RETURNING "id"',entryId);
		if(result) {
			return true;
		}
		else {
			return false;
		}
	},

	editEntry: async (entryId,timestamp,distance,duration,location) => {
		let result = await db.any('UPDATE "entry" SET "timestamp" = $1, "distance_in_meters" = $2,"duration_in_secs" = $3,"location" = $4 WHERE "id" = $5 RETURNING "id"',[timestamp,distance,duration,location,entryId]);
		if(result) {
			return true;
		}
		else {
			return false;
		}
	}
}

module.exports = EntryRepository;