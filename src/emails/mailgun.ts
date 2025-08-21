import { Item } from '@prisma/client';
import FormData from 'form-data';
import { htmlToText } from 'html-to-text';
import Mailgun from 'mailgun.js';
import { getAdminEmails } from './common';
import { renderApprovalEmail, renderArchiveEmail } from './renderemail';

const mailgun = new Mailgun(FormData);

if (!process.env.MAILGUN_API_KEY) {
  throw new Error('Missing MAILGUN_API_KEY environment variable');
}

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
});

// To gracefully exit the process on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting gracefully...');
  process.exit(0); // Use a numeric exit code
});

export const sendEmail = async (
  to: string[],
  subject: string,
  html: string
) => {
  mg.messages
    .create(`${process.env.MAILGUN_DOMAIN}`, {
      from: `Lost and Found <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: to,
      subject: subject,
      text: htmlToText(html),
      html: html
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.error(err)); // logs any error
};

export const sendArchivedEmail = async (archivedItems: Item[]) => {
  const emailBody = await renderArchiveEmail(archivedItems);
  const adminEmails = await getAdminEmails();

  await sendEmail(adminEmails, '90 day items', emailBody);
};

export async function sendApprovalEmail(input: Item) {
  const adminEmails = await getAdminEmails();
  const subject =
    'New Item Added: Approval Needed' +
    (input.value === 'HIGH' ? ' - HIGH VALUE' : '');
  const emailBody = await renderApprovalEmail(input);
  await sendEmail(adminEmails, subject, emailBody);
}
