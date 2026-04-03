import type { Request, Response } from "express";

class FileHandlerController {
    async uploadFile(req: Request, res: Response) {
        // code to handle file upload
    }

    async downloadFile(req: Request, res: Response) {
        // code to handle file download
    }

    async deleteFile(req: Request, res: Response) {
        // code to handle file deletion
    }

    async listFiles(req: Request, res: Response) {
        // code to handle listing all files
    }
}

export default FileHandlerController;
