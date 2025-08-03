import { send_email } from '~/emails/mailgun';
import { EmailItem } from '~/types';
import { renderApprovalEmail } from './renderemail';

export async function sendApprovalEmail(input: EmailItem) {
  const emails = ['annagu@andrew.cmu.edu'];
  const subject =
    'New Item Added: Approval Needed' +
    (input.value === 'HIGH' ? ' - HIGH VALUE' : '');
  const email_body = await renderApprovalEmail(input);
  await send_email(emails, subject, 'HELLO', email_body);
}
