import { NextRequest, NextResponse } from 'next/server';
import prisma from 'server/db/client';
import { sendDailyUpdateEmails } from '~/emails/getSubEmails';

process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting gracefully...');
  prisma.$disconnect().then(() => {
    process.exit(0); // Use a numeric exit code
  });
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401
    });
  }

  await sendDailyUpdateEmails();

  return NextResponse.json({ success: true });
}
