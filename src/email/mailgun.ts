import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});

export const send_email = async (
  to: string[],
  subject: string,
  desc: string,
  html: string
) => {
  mg.messages
    .create(`${process.env.MAILGUN_DOMAIN}`, {
      from: `Lost and Found <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: to,
      subject: subject,
      text: desc,
      html: html
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.error(err)); // logs any error
};
