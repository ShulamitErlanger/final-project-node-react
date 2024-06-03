const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail =  (to,title,body)=>{
  const mailOptions = {
      from: 'סקר נשר <'+process.env.EMAIL_ADDRESS+'>' ,
      to: to,
      subject: title,
      html: body
  }
  return transporter.sendMail(mailOptions);
}


const sendEmailToUser = (to,title,body)=>{

  sendEmail(to,title,body)
      .then(info => {

          return true
      })
      .catch(error => {

          return false
      });
}

module.exports = sendEmailToUser
