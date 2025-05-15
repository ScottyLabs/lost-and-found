import { clerkClient } from '@clerk/nextjs/server';
import { Category } from '@prisma/client';
import { send_email } from '~/emails/mailgun';
import prisma from '~/server/db/client';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sends daily update emails to subscribers for each category.
 * Also deletes subscriptions that are older than a week.
 */
export async function sendDailyUpdateEmails() {
  const now = new Date();
  const validSince = new Date(now.getTime() - WEEK_IN_MS);

  for (const category of Object.values(Category)) {
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

    console.log(emails);

    if (emails.length === 0) {
      console.log(`No valid subscriptions for category: ${category}`);
      continue;
    }

    // Compose email content – you can adjust this to include dynamic updates if needed
    const subject = `Daily Update: ${category} - Lost & Found Updates`;
    const textMessage = `Hello,

Here are the latest updates for ${category}. Please check our app for more details.

Regards,
Lost & Found Team`;
    const htmlMessage = `<p>Hello,</p>
<p>Here are the latest updates for <strong>${category}</strong>. Please check our app for more details.</p>
<p>Regards,<br/>Lost & Found Team</p>`;

    // Send email via Mailgun
    try {
      await send_email(emails, subject, textMessage, htmlMessage);
      console.log(`Emails sent for category: ${category}`);
    } catch (error) {
      console.error(`Error sending emails for category ${category}:`, error);
    }
  }

  // Remove expired subscriptions (those older than a week)
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
