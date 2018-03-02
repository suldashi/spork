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
        port: 8088
    },
    email: {
        confirmationEmailSender:"ermirsuldashi@gmail.com",
        mailgunApiKey:"key-7b2c907ddd7ebcef726661af6202cdc4",
        mailgunDomain:"sandboxbf3469aa3b6b4b22b86009317bafd2f6.mailgun.org"
    }
};
module.exports = config;