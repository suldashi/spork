var config = {
    db: {
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        dbName: "spork"
    },
    app: {
        url: "http://localhost",
        port: 8088,
        confirmationEmailSender:"ermirsuldashi@gmail.com"
        
    }
};
module.exports = config;