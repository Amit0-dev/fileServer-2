import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import { register as registerHealthRoutes } from "./routes/health/route";
import { register as registerAuthRoutes } from "./routes/auth/route";
import { register as registerFileHandlingRoutes } from "./routes/fileHandling/route";

export function createApp(): Application {
    const app: Application = express();

    app.use(express.json());
    app.use(cookieParser());

    app.use("/health", registerHealthRoutes());
    app.use("/auth", registerAuthRoutes());
    app.use("/files", registerFileHandlingRoutes());

    return app;
}
