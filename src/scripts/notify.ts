import { mg } from '~/lib/mailgun';
import prisma from '~/server/db/client';

import { clerkClient } from '@clerk/nextjs';

async function notify() {
  const subscriptions = await prisma.subscription.findMany();

  subscriptions.forEach(async (subscription) => {
    const items = await prisma.item.findMany({
      where: { categories: { hasSome: subscription.category } }
    });

    const age = new Date().getTime() - subscription.createdAt.getTime();

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: subscription.userId }
    });

    const clerkUser = await clerkClient.users.getUser(user.externalId);
    const emailAddress = clerkUser.emailAddresses[0]!.emailAddress;

    if (age > 1000 * 60 * 60 * 24 * 7) {
    } else {
      mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: 'ScottyLabs Lost and Found <lostandfound@scottylabs.org>',
        to: emailAddress
      });
    }
  });
}
