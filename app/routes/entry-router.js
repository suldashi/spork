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
    let result = await entryService.addEntry(req.userId,req.body.timestamp,req.body.distance,req.body.duration,req.body.location);
    res.send({entryId:result});
});

router.delete("/delete",async (req,res) => {
    let entry = await entryService.getEntryById(req.body.entryId);
    if(entry) {
        let result = await entryService.deleteEntry(req.body.entryId);
        res.send({entryId:result});
    }
    else {
        res.status(403).send({error:"cannot delete entry"});
    }
});

router.put("/edit",async (req,res) => {
    let entry = await entryService.getEntryById(req.body.entryId);
    if(entry && entry.userId === req.userId) {
        let result = await entryService.editEntry(req.body.entryId,req.body.timestamp,req.body.distance,req.body.duration,req.body.location);
        res.send({});
    }
    else {
        res.status(403).send({error:"cannot delete entry"});
    }
});

module.exports = router;