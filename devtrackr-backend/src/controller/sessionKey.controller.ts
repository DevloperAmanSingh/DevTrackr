import { Request, Response } from "express";
import { generateSessionKey, validateSessionKey } from "../services/sessionKey.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const generateSessionKeyController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as AuthRequest).user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const sessionKey = await generateSessionKey(userId);
    res.status(200).json({ sessionKey });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const validateSessionKeyController = async (
  req: Request,
  res: Response
) => {
  const { sessionKey } = req.body;
  try {
    const isValid = await validateSessionKey(sessionKey);
    res.status(200).json({ isValid });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};