import { Response } from "express";
import { getUserDetailsByEmail } from "../services/user.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userDetails = await getUserDetailsByEmail(req.user.userId);
    res.json(userDetails);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
        return;
      }
    }
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
