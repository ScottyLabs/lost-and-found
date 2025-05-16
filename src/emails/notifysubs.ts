import { clerkClient } from '@clerk/nextjs/server';
import { Category } from '@prisma/client';
import { Categories } from 'types';
import { send_email } from '~/emails/mailgun';
import prisma from '~/server/db/client';
import { renderSubscriptionEmail } from './renderemail';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export async function removeExpiredSubscriptions() {
  const now = new Date();
  const validSince = new Date(now.getTime() - WEEK_IN_MS);
  try {
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
    const cat_string = Categories[category];
    const subscriptions = await prisma.subscription.findMany({
      where: {
        category,
        createdAt: {
          gte: validSince
        }
      }
    });

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
    if (emails.length === 0) {
      console.log(`No valid subscriptions for category: ${cat_string}`);
      continue;
    }

    const items = await prisma.item.findMany({
      where: { categories: { hasSome: category } }
    });
    if (items.length === 0) {
      console.log(`No items for category: ${cat_string}`);
      continue;
    }

    const subject = `Lost and Found Daily Update: ${cat_string}`;
    const email_body = await renderSubscriptionEmail({
      previewText: '',
      category: category,
      items: items
    });

    await send_email(emails, subject, 'HELLO', email_body);
  }
}
