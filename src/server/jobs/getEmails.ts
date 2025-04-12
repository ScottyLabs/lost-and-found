import { Category } from '@prisma/client';
import prisma from '~/server/db/client';
import { send_email } from '~/server/lib/mailgun';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sends daily update emails to subscribers for each category.
 * Also deletes subscriptions that are older than a week.
 */
export async function sendDailyUpdateEmails() {
  const now = new Date();
  const validSince = new Date(now.getTime() - WEEK_IN_MS);

  // Loop through every category defined in your enum
  for (const category of Object.values(Category)) {
    // Fetch subscriptions for the category that are still valid (not older than a week)
    const subscriptions = await prisma.subscription.findMany({
      where: {
        category,
        createdAt: {
          gte: validSince
        }
      }
    });

    // Extract email addresses (ensure they are not null)
    const emails = subscriptions
      .map((sub) => sub.emailAddress)
      .filter((email) => Boolean(email));

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

// If you want to run this file directly (e.g., via node), you can add:
/*
if (require.main === module) {
  sendDailyUpdateEmails()
    .then(() => {
      console.log("Daily update emails job completed.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error in daily update emails job:", error);
      process.exit(1);
    });
}
*/
