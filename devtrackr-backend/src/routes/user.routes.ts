import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// GET /api/user/profile - Protected route
router.get("/profile", verifyToken, getUserProfile);

export default router;
