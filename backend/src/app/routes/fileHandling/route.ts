import express from "express";
import type { Router } from "express";
import FileHandlerController from "./controller";
import { upload } from "../../../utils/multer";

export function register(): Router {
    const router: Router = express.Router();

    const controller = new FileHandlerController();

    router.post("/upload", upload.single("file"), controller.uploadFile.bind(controller));
    router.get("/download/:fileId", controller.downloadFile.bind(controller));
    router.delete("/delete/:fileId", controller.deleteFile.bind(controller));
    router.get("/list", controller.listFiles.bind(controller));

    return router;
}
