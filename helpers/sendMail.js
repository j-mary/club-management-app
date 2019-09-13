import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let mailConfig;

if (process.env.NODE_ENV === 'production') {
  // all emails are delivered to destination
  mailConfig = {
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: 'STARTTLS',
    auth: {
      user: 'kattie.strosin97@ethereal.email',
      pass: 'JRuFqaFgUDhf1PG7f9',
    },
    logger: true,
    debug: false, // include SMTP traffic in the logs
  };
}

/**
 * handles mailing service
 * @param {object} mailOptions object containing mailing credentials
 * @returns {object} object in json
 */
const sendMail = (mailOptions) => {
  const transporter = nodemailer.createTransport(mailConfig);

  transporter.sendMail(mailOptions)
    .then((info) => {
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }).catch((/* error */) => {
      console.log('error check your mail');
    });
};

export default sendMail;
