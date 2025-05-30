import express from "express";
import authRoutes from "./routes/auth.routes";
import sessionKeyRoutes from "./routes/sessionKey.routes";
import logRoutes from "./routes/log.routes";
import cors from "cors";

const app = express();
app.use(express.json());
// use cors
app.use(cors({
  // allow all origins
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api/auth", authRoutes);
app.use("/api/session-key", sessionKeyRoutes);
app.use("/api/log", logRoutes);

export default app;
