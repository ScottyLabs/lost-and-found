import { Status } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from 'server/db/client';
import { archived_items } from '~/emails/mailgun';

// To gracefully exit the process on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting gracefully...');
  prisma.$disconnect().then(() => {
    process.exit(0); // Use a numeric exit code
  });
});

export async function GET() {
  // const authHeader = request.headers.get('authorization');
  // console.log(authHeader);
  // console.log(`Bearer ${process.env.CRON_SECRET}`);
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   });
  // }

  const archivedItems = await prisma.item.findMany({
    where: {
      status: Status.APPROVED,
      foundDate: {
        // 30 days ago
        lt: new Date(new Date().getTime() - 30 * 1000 * 60 * 60 * 24)
      }
    }
  });

  await archived_items(archivedItems);

  await prisma.item.updateMany({
    where: {
      status: Status.APPROVED,
      foundDate: {
        // 30 days ago
        lt: new Date(new Date().getTime() - 30000)
      }
    },
    data: { status: Status.ARCHIVED }
  });

  return NextResponse.json({ success: true });
}
