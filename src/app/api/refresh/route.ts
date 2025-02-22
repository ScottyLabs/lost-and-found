/*
visit http://localhost:3000/api/refresh to send the email
*/
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_ADDRESS = 'xxx@gmail.com'; // Replace with valid email

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});
console.log('MAILGUN_API_KEY:', process.env.MAILGUN_API_KEY);
console.log('MAILGUN_DOMAIN:', process.env.MAILGUN_DOMAIN);

export async function GET(req: NextRequest) {
  try {
    // Send the email
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `Lost and Found App <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: EMAIL_ADDRESS /* Should be updated to send emails to subscribed users */,
      subject: 'Vercel Cron Job Test Email',
      text: 'Hello, this is a test email sent from a Vercel cron job!'
    });

    console.log('Email sent successfully:', response);
    return NextResponse.json({
      status: 200,
      statusText: 'Email sent successfully!'
    });
  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json({
      status: 500,
      statusText: 'Failed to send email'
    });
  }
}
