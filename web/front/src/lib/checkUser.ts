import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { extractNameFromEmail } from '@/utils/extractNameFromEmail';
import { useUser } from './user';

export const checkUser = async () => {
  const user = await currentUser();

  // Check for current logged in clerk user
  if (!user) {
    return null;
  }

  // Check if the user is already in the database
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // If user is in database, return user
  if (loggedInUser) {
    return loggedInUser;
  }

  // If not in database, create new user
  const { cea } = useUser()

  return newUser;
};
