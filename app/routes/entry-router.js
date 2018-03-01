let router = require('express').Router();

const EntryService = require("../entry/entry-service");
const entryService = new EntryService();

const authMiddleware = require("./auth-middleware");

router.use(authMiddleware);

router.get("/",async (req,res) => {
    let entries = await entryService.getEntriesByUserId(req.userId);
    res.send({entries});
});

router.post("/add",async (req,res) => {
    let result = await entryService.addEntry(req.userId,req.body.timestamp,req.body.distance,req.body.duration,req.body.location);
    res.send({entryId:result});
});

module.exports = router;