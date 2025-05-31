import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface SessionRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const validateSession = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
): void => {
  const sessionKey = req.headers["x-session-key"] as string;

  if (!sessionKey) {
    res.status(401).json({ error: "Session key is required" });
    return;
  }

  prisma.user
    .findUnique({
      where: { sessionKey },
      select: {
        id: true,
        email: true,
      },
    })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Invalid session key" });
        return;
      }
      req.user = user;
      next();
    })
    .catch((error) => {
      console.error("Session validation error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};
