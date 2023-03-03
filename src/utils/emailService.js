const nodemailer = require('nodemailer');

function doSend(email, subject, text, html_text) {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3aabab09b18603",
      pass: "b965e9e5984c3e"
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
    html: html_text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return Promise.resolve(true);
}

function sendVerifyUserEmail(fullName, email, user_token) {
  const html_text =`<h1>Hello ${fullName} Please Click on this link<h1><br><hr>
  <br><a href="http://localhost:3001/api/auth/confirmation/${email}/${user_token}">Please verify your account by clicking the link</a>`
  const subject = 'Account Verification';
  const text = 'Account Verification';

  return doSend(email, subject, text, html_text);
}

module.exports = {
  sendVerifyUserEmail
};
