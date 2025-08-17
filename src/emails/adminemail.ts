import { Item } from '@prisma/client';
import { sendEmail } from '~/emails/mailgun';
import { renderApprovalEmail } from './renderemail';

export async function sendApprovalEmail(input: Item) {
  const emails = ['annagu@andrew.cmu.edu'];
  const subject =
    'New Item Added: Approval Needed' +
    (input.value === 'HIGH' ? ' - HIGH VALUE' : '');
  const emailBody = await renderApprovalEmail(input);
  await sendEmail(emails, subject, 'HELLO', emailBody);
}
