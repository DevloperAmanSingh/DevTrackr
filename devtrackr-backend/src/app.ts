import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import logRoutes from "./routes/log.routes";
import authRoutes from "./routes/auth.routes";
import sessionKeyRoutes from "./routes/sessionKey.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/session-key", sessionKeyRoutes);
// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

export default app;
