import { Item } from '@prisma/client';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { renderArchiveEmail } from './renderemail';

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || ''
});

// To gracefully exit the process on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting gracefully...');
  process.exit(0); // Use a numeric exit code
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

export const archived_items = async (archivedItems: Item[]) => {
  const email_body = await renderArchiveEmail(archivedItems);

  await send_email(
    ['annagu@andrew.cmu.edu'],
    '30 day items',
    'HELLO',
    email_body
  );
};
