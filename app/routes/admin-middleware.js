const SessionService = require("../session/session-service");
const sessionService = new SessionService();
const UserService = require("../user/user-service");
const userService = new UserService();

module.exports = async (req,res,next) => {
    let bearer = req.header("Authorization");
    if(bearer) {
        let authToken = getAuthTokenFromBearerHeader(bearer);
        let userId = await sessionService.getUserId(authToken);
        if(userId) {
            let user = await userService.getUserById(userId);
            if(user.isAdmin) {
                next();
            }
            else {
                res.status(403).send({error:"not authenticated"});
            }
        }
        else {
            res.status(403).send({error:"not authenticated"});    
        }
    }
    else {
        res.status(403).send({error:"not authenticated"});
    }
}

function getAuthTokenFromBearerHeader(bearerHeader) {
    let pieces = bearerHeader.split("Bearer ");
    if(pieces[1]) {
        return pieces[1];
    }
    else {
        return null;
    }
}