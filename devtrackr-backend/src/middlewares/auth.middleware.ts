import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devtrackr-secret";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as AuthRequest).user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
