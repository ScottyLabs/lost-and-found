import { clerkClient } from '@clerk/nextjs/server';
import prisma from '~/server/db/client';

type User = Awaited<ReturnType<typeof prisma.user.findMany>>[number];
export async function getEmails(users: User[]) {
  const clerkUsers = await Promise.all(
    users.map((user) => clerkClient.users.getUser(user.externalId))
  );

  const emails = clerkUsers.map(
    (clerkUser) => clerkUser.emailAddresses[0]!.emailAddress
  );

  return emails;
}
export async function getAdminEmails() {
  const adminUsers = await prisma.user.findMany({
    where: {
      permission: 'ADMIN',
      notifications: true
    }
  });

  return getEmails(adminUsers);
}
