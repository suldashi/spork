let router = require('express').Router();
let moment = require("moment");

const EntryService = require("../entry/entry-service");
const entryService = new EntryService();

const authMiddleware = require("./auth-middleware");

router.use(authMiddleware);

router.get("/",async (req,res) => {
    let userId = req.query.userId;
    let lowerLimit = moment(parseInt(req.query.lowerLimit));
    let upperLimit = moment(parseInt(req.query.upperLimit));
    if(!userId || userId === "undefined") {
        userId = req.userId;
    }
    let entries = await entryService.getEntriesBetweenDates(userId,lowerLimit,upperLimit);
    res.send({entries});
});

router.post("/add",async (req,res) => {
    let userId = req.userId;
    if(req.body.userId && req.body.userId!=="undefined") {
        userId = req.body.userId;
    }
    let result = await entryService.addEntry(userId,req.body.timestamp,req.body.distance,req.body.duration,req.body.location);
    res.send({entryId:result});
});

router.delete("/delete",async (req,res) => {
    let entry = await entryService.getEntryById(req.body.entryId);
    if(entry && (entry.userId === req.userId || req.isAdmin)) {
        let result = await entryService.deleteEntry(req.body.entryId);
        res.send({entryId:result});
    }
    else {
        res.status(403).send({error:"cannot delete entry"});
    }
});

router.put("/edit",async (req,res) => {
    let entry = await entryService.getEntryById(req.body.entryId);
    if(entry && (entry.userId === req.userId || req.isAdmin)) {
        let result = await entryService.editEntry(req.body.entryId,req.body.timestamp,req.body.distance,req.body.duration,req.body.location);
        res.send({});
    }
    else {
        res.status(403).send({error:"cannot edit entry"});
    }
});

module.exports = router;