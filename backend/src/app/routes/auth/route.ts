import express from "express";
import AuthController from "./controller";
import type { Router } from "express";
import { checkAuth } from "../../middleware/auth.middleware";

export function register(): Router {
    const router: Router = express.Router();

    const controller = new AuthController();

    router.post("/signup", controller.signup.bind(controller));
    router.post("/login", controller.login.bind(controller));
    router.post("/logout", checkAuth, controller.logout.bind(controller));
    router.post("/verify", controller.verifyEmail.bind(controller));
    router.get("/me", checkAuth, controller.getCurrentLogggedInUser.bind(controller));

    return router;
}
