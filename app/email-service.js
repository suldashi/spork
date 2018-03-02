var Mailgun = require('mailgun-js');
const config = require("./config");

class EmailService {

    constructor() {
        this.mailgunInstance = new Mailgun({apiKey:config.email.mailgunApiKey,domain:config.email.mailgunDomain});
    }

    sendActivationLink(activationCode,recipientAddress) {
        let from = config.email.confirmationEmailSender;
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