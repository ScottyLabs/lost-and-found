import { clerkClient } from '@clerk/nextjs/server';
import { Category, Status } from '@prisma/client';
import { Categories } from 'types';
import { sendEmail } from '~/emails/mailgun';
import prisma from '~/server/db/client';
import { renderSubEndEmail, renderSubscriptionEmail } from './renderemail';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

type Subscription = Awaited<
  ReturnType<typeof prisma.subscription.findMany>
>[number];

async function getEmails(subscriptions: Subscription[]) {
  if (subscriptions.length === 0) return [];
  const users = await Promise.all(
    subscriptions.map((sub) =>
      prisma.user.findUniqueOrThrow({
        where: { id: sub.userId }
      })
    )
  );

  const clerkUsers = await Promise.all(
    users.map((user) => clerkClient.users.getUser(user.externalId))
  );

  const emails = clerkUsers.map(
    (clerkUser) => clerkUser.emailAddresses[0]!.emailAddress
  );

  return emails;
}

export async function removeExpiredSubscriptions() {
  const now = new Date();
  const validSince = new Date(now.getTime() - WEEK_IN_MS);
  try {
    for (const category of Object.values(Category)) {
      const catString = Categories[category];
      const subscriptions = await prisma.subscription.findMany({
        where: {
          category,
          createdAt: {
            lt: validSince
          }
        }
      });
      const emails = await getEmails(subscriptions);
      if (emails.length === 0) {
        console.log(`No expired subscriptions for category: ${catString}`);
        continue;
      }

      const subject = `Lost and Found Subscription End: ${catString}`;
      const emailBody = await renderSubEndEmail({
        previewText: 'Your subscription has come to an end',
        category: category
      });

      await sendEmail(emails, subject, 'HELLO', emailBody);
    }

    const deleteResult = await prisma.subscription.deleteMany({
      where: {
        createdAt: {
          lt: validSince
        }
      }
    });
    console.log(`Expired subscriptions removed: ${deleteResult.count}`);
  } catch (error) {
    console.error('Error deleting expired subscriptions:', error);
  }
}

export async function sendDailyUpdateEmails() {
  const now = new Date();
  const validSince = new Date(now.getTime() - WEEK_IN_MS);

  for (const category of Object.values(Category)) {
    const catString = Categories[category];
    const subscriptions = await prisma.subscription.findMany({
      where: {
        category,
        createdAt: {
          gte: validSince
        }
      }
    });

    const emails = await getEmails(subscriptions);
    if (emails.length === 0) {
      console.log(`No valid subscriptions for category: ${catString}`);
      continue;
    }

    const items = await prisma.item.findMany({
      where: {
        categories: { hasSome: category },
        status: Status.APPROVED,
        foundDate: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    });
    if (items.length === 0) {
      console.log(`No items for category: ${catString}`);
      continue;
    }

    const subject = `Lost and Found Daily Update: ${catString}`;
    const emailBody = await renderSubscriptionEmail({
      previewText: 'See what new items were found',
      category: category,
      items: items
    });

    await sendEmail(emails, subject, 'HELLO', emailBody);
  }
}
