import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
const prisma = new PrismaClient();

export const generateSessionKey = async (userId: string): Promise<string> => {
  const randomId = randomBytes(4).toString("hex");
  const sessionKey = `devtrackr_${randomId}`;
  console.log("sessionKey", sessionKey);

  await prisma.user.update({
    where: { id: userId },
    data: { sessionKey },
  });

  return sessionKey;
};

export const validateSessionKey = async (sessionKey: string) => {
  const user = await prisma.user.findFirst({
    where: { sessionKey },
  });

  if (!user) {
    throw new Error('Invalid session key');
  }

  return user;
};
