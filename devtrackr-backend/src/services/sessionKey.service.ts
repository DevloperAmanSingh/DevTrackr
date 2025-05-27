import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
const prisma = new PrismaClient();

export const generateSessionKey = async (userId: string): Promise<string> => {
  const sessionKey = randomBytes(24).toString('hex');

  await prisma.user.update({
    where: { id: userId },
    data: { sessionKey },
  });

  return sessionKey;
};
