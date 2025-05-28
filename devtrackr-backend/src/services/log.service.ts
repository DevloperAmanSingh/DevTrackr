import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const saveLogsForUser = async (
  sessionKey: string,
  logs: Record<string, any>
) => {
  const user = await prisma.user.findUnique({ where: { sessionKey } });
  if (!user) throw new Error("Invalid session key");

  for (const date in logs) {
    const entry = logs[date];

    await prisma.dailyLog.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date,
        },
      },
      update: {
        files: entry.files || {},
        folders: entry.folders || {},
        languages: entry.languages || {},
      },
      create: {
        userId: user.id,
        date,
        files: entry.files || {},
        folders: entry.folders || {},
        languages: entry.languages || {},
      },
    });
  }
};

export const getLogsForUser = async (sessionKey: string) => {
  const user = await prisma.user.findUnique({
    where: { sessionKey },
    include: {
      logs: true,
    },
  });

  if (!user) throw new Error("Invalid session key");

  // Convert logs to date-wise dictionary
  const formattedLogs: Record<string, any> = {};
  for (const log of user.logs) {
    formattedLogs[log.date] = {
      files: log.files,
      folders: log.folders,
      languages: log.languages,
    };
  }

  return formattedLogs;
};
