const SessionService = require("../session/session-service");
const sessionService = new SessionService();

module.exports = async (req,res,next) => {
    let bearer = req.header("Authorization");
    if(bearer) {
        bearer = bearer.split("Bearer ")[1];
        let userId = await sessionService.getUserId(bearer);
        req.userId = userId;
    }
    else {
        req.userId = null;
    }
    next();
}