// src/server/lib/mailgun.ts
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});

export async function send_email(emails: string[], subject: string, text: string, html: string) {
  return mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `Lost and Found App <no-reply@${process.env.MAILGUN_DOMAIN}>`,
    to: emails,
    subject,
    text,
    html
  });
}
