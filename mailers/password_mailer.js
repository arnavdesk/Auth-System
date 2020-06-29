const mailer = require("../config/nodemailer");
const dotenv = require('dotenv');
// Exporting a method


module.exports.forgotPassMail = (user, resetLink) => {
    let htmlString = mailer.renderTemplate({user:user,reset_link:resetLink},'/security-reset.ejs');
    mailer.transporter.sendMail({
        from: process.env.EMAIL,
        to : user.email,
        subject : "Retrieve Password",
        html: htmlString
    }, (err,info)=>{
        if(err){
            console.log("mail sending failed", err);
            return;
        }
        console.log("Message Sent", info);
        return;
    })
}

module.exports.passwordChangedMail = (user, resetLink) => {
    let htmlString = mailer.renderTemplate({user:user,reset_link:resetLink},'/password-changed.ejs');
    mailer.transporter.sendMail({
        from: process.env.EMAIL,
        to : user.email,
        subject : "Password changed",
        html:htmlString
    }, (err,info)=>{
        if(err){
            console.log("mail sending failed", err);
            return;
        }
        console.log("Message Sent", info);
        return;
    })
}