import express from "express";
import AuthController from "./controller";
import type { Router } from "express";

export function register(): Router {
    const router: Router = express.Router();

    const controller = new AuthController();

    router.post("/signup", controller.signup.bind(controller));
    router.post("/login", controller.login.bind(controller));
    router.post("/logout", controller.logout.bind(controller));
    router.get("/me", controller.getCurrentLogggedInUser.bind(controller));

    return router;
}
