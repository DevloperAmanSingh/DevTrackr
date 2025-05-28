import express, { NextFunction } from "express";
import { generateSessionKeyController, validateSessionKeyController } from "../controller/sessionKey.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/generate-session-key", verifyToken, generateSessionKeyController);
router.post("/validate-session-key", validateSessionKeyController);
export default router;
