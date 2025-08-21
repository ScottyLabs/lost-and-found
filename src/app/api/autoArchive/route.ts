import { Status } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'server/db/client';
import { sendArchivedEmail } from '~/emails/mailgun';

// To gracefully exit the process on SIGINT (Ctrl+C)
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

  const archivedItems = await prisma.item.findMany({
    where: {
      status: Status.APPROVED,
      foundDate: {
        // 90 days ago
        lt: new Date(new Date().getTime() - 90 * 1000 * 60 * 60 * 24)
      }
    }
  });

  if (archivedItems.length > 0) {
    await sendArchivedEmail(archivedItems);
  }

  return NextResponse.json({ success: true });
}
