let bcrypt = require("bcrypt");
let crypto = require("crypto");

class CryptoService {

    async hashPassword(password) {
        let salt = await this.generateSalt();
        return bcrypt.hash(password,salt);
    }

    async comparePassword(password, hash) {
        if(password && hash) {
            return bcrypt.compare(password, hash);
        }
        return false;
    }

    getRandomBytes() {
        return crypto.randomBytes(16).toString('hex');
    }

    async generateSalt() {
        return bcrypt.genSalt();
    }
}

module.exports = new CryptoService();