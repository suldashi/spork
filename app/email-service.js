var Mailgun = require('mailgun-js');
const config = require("./config");

class EmailService {

    constructor() {
        this.mailgunApiKey = "key-7b2c907ddd7ebcef726661af6202cdc4";
        this.mailgunDomain = "sandboxbf3469aa3b6b4b22b86009317bafd2f6.mailgun.org";
        this.mailgunInstance = new Mailgun({apiKey:this.mailgunApiKey,domain:this.mailgunDomain});
    }

    sendActivationLink(activationCode,recipientAddress) {
        let from = config.app.confirmationEmailSender;
        let subject = "Activate your Spork account";
        let activationUrl = `${config.app.url}:${config.app.port}/activate/${activationCode}`;
        let emailBody = `<a href="${activationUrl}">Click here</a> to activate your Spork account
         or copy this address on your browser:<br/><br/>${activationUrl}<br/><br/>The Spork Team`;
        return new Promise((resolve,reject) => {
            this.mailgunInstance.messages().send({
                from,to:recipientAddress,subject,html:emailBody
            },(err,body) => {
                if(err){
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
}

module.exports = new EmailService();