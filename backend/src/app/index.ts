import express from "express";
import type { Application } from "express";
import { register as registerHealthRoutes } from "./routes/health/route";
import { register as registerAuthRoutes } from "./routes/auth/route";

export function createApp(): Application {
    const app: Application = express();

    app.use(express.json());

    app.use("/health", registerHealthRoutes());
    app.use("/auth", registerAuthRoutes());

    return app;
}
