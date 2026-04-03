import express from "express";
import type { Router } from "express";
import FileHandlerController from "./controller";
import { upload } from "../../../utils/multer";
import { checkAuth } from "app/middleware/auth.middleware";

export function register(): Router {
    const router: Router = express.Router();

    const controller = new FileHandlerController();

    router.post(
        "/upload",
        checkAuth,
        upload.single("file"),
        controller.uploadFile.bind(controller),
    );
    router.get("/download",checkAuth, controller.downloadFile.bind(controller));
    router.delete("/delete", checkAuth, controller.deleteFile.bind(controller));
    router.get("/list", checkAuth, controller.listFiles.bind(controller));

    return router;
}
