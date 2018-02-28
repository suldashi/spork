let router = require('express').Router();

const EntryService = require("../entry/entry-service");
const entryService = new EntryService();

const authMiddleware = require("./auth-middleware");

router.use(authMiddleware);

router.get("/",async (req,res) => {
    let entries = await entryService.getEntriesByUserId(req.userId);
    res.send({entries});
});

module.exports = router;