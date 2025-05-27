import express from "express";
import authRoutes from "./routes/auth.routes";
import sessionKeyRoutes from "./routes/sessionKey.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/session-key", sessionKeyRoutes);

export default app;
