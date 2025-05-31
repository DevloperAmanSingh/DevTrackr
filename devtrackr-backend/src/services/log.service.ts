import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface FolderStats {
  totalTime: number;
  files: Record<string, number>;
  languages: string[];
}

interface DailyLogData {
  [folderName: string]: FolderStats;
}

export const saveLogsForUser = async (
  sessionKey: string,
  logs: Record<string, DailyLogData>
) => {
  const user = await prisma.user.findUnique({ where: { sessionKey } });
  if (!user) throw new Error("Invalid session key");

  for (const date in logs) {
    const entry = logs[date];

    // Get existing log if any
    const existingLog = await prisma.dailyLog.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date,
        },
      },
    });

    let updatedFolders = entry;
    if (existingLog) {
      // Merge existing data with new data
      const existingFolders = existingLog.folders as unknown as DailyLogData;
      updatedFolders = { ...existingFolders };

      for (const folderName in entry) {
        if (updatedFolders[folderName]) {
          // Merge folder data
          const existing = updatedFolders[folderName];
          const newData = entry[folderName];

          // Update total time
          existing.totalTime += newData.totalTime;

          // Merge files
          for (const file in newData.files) {
            existing.files[file] =
              (existing.files[file] || 0) + newData.files[file];
          }

          // Merge languages (unique)
          existing.languages = [
            ...new Set([...existing.languages, ...newData.languages]),
          ];
        } else {
          // Add new folder
          updatedFolders[folderName] = entry[folderName];
        }
      }
    }

    const createData: Prisma.DailyLogCreateInput = {
      user: { connect: { id: user.id } },
      date,
      folders: updatedFolders as unknown as Prisma.InputJsonValue,
    };

    const updateData: Prisma.DailyLogUpdateInput = {
      folders: updatedFolders as unknown as Prisma.InputJsonValue,
    };

    await prisma.dailyLog.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date,
        },
      },
      update: updateData,
      create: createData,
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
  const formattedLogs: Record<string, DailyLogData> = {};
  for (const log of user.logs) {
    formattedLogs[log.date] = log.folders as unknown as DailyLogData;
  }

  return formattedLogs;
};
