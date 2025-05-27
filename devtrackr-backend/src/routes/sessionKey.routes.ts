import express, { NextFunction } from "express";
import { generateSessionKeyController } from "../controller/sessionKey.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/generate-session-key", verifyToken, generateSessionKeyController);

export default router;
