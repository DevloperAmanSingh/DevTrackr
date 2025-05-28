import express from "express";
import authRoutes from "./routes/auth.routes";
import sessionKeyRoutes from "./routes/sessionKey.routes";
import logRoutes from "./routes/log.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/session-key", sessionKeyRoutes);
app.use("/api/log", logRoutes);

export default app;
