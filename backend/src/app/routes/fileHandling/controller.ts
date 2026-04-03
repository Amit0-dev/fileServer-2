import type { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { s3Client } from "../../../utils/s3Client";
import {
    Bucket$,
    DeleteObjectCommand,
    GetObjectCommand,
    paginateListObjectsV2,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { env } from "env";
import type { RequestWithUser } from "interfaces/requestWithUser";
import type { User } from "interfaces/user";
import { logger } from "logger";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class FileHandlerController {
    async uploadFile(req: RequestWithUser, res: Response) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const user = req.user as User;

            if (!user || !user.bucketFolderName) {
                return res.status(400).json({ message: "User  not found" });
            }

            const filePath: string = file.path;
            const fileType: string = file.mimetype;
            const fileSize: number = file.size;

            const s3 = s3Client();

            const key: string = `${user.bucketFolderName}/${Date.now()}-${file.originalname}`;

            const command = new PutObjectCommand({
                Bucket: env.AWS_S3_BUCKET_NAME,
                Key: key,
                Body: await fs.readFile(path.join(process.cwd(), filePath)),
                ContentType: fileType,
                ContentLength: fileSize,
                ContentDisposition: `attachment; filename="${Date.now()}-${file.originalname}"`,
            });

            const response = await s3.send(command);

            if (response.$metadata.httpStatusCode !== 200) {
                logger.error("Error uploading file to S3:", response);
                return res.status(500).json({
                    message: "Error uploading file to S3",
                    success: false,
                    error: response,
                });
            }

            // now unlink the file from temp storage
            await fs.unlink(path.join(process.cwd(), filePath));

            return res.status(200).json({ message: "File uploaded successfully", success: true });
        } catch (error) {
            logger.error("Error uploading file:", error);
            return res.status(500).json({
                message: "Error uploading file",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async downloadFile(req: RequestWithUser, res: Response) {
        try {
            const { key } = req.query;

            console.log("Received download request for key:", key);

            if (!key || typeof key !== "string") {
                return res.status(400).json({ message: "File key is required" });
            }

            const s3 = s3Client();

            const command = new GetObjectCommand({
                Bucket: env.AWS_S3_BUCKET_NAME,
                Key: key,
            });

            const url = await getSignedUrl(s3, command);

            return res
                .status(200)
                .json({ message: "File download URL generated", success: true, url });
        } catch (error) {
            logger.error("Error downloading file:", error);
            return res.status(500).json({
                message: "Error downloading file",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async deleteFile(req: Request, res: Response) {
        try {
            const { key } = req.query;

            if (!key || typeof key !== "string") {
                return res.status(400).json({ message: "File key is required" });
            }

            const s3 = s3Client();

            const command = new DeleteObjectCommand({
                Bucket: env.AWS_S3_BUCKET_NAME,
                Key: key,
            });

            const response = await s3.send(command);

            if (response.$metadata.httpStatusCode !== 204) {
                logger.error("Error deleting file from S3:", response);
                return res.status(500).json({
                    message: "Error deleting file from S3",
                    success: false,
                    error: response,
                });
            }

            return res.status(200).json({ message: "File deleted successfully", success: true });
        } catch (error) {
            logger.error("Error deleting file:", error);
            return res.status(500).json({
                message: "Error deleting file",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }

    async listFiles(req: RequestWithUser, res: Response) {
        try {
            const user = req.user as User;
            const objectContent = [];

            if (!user || !user.bucketFolderName) {
                return res.status(400).json({ message: "User  not found" });
            }

            const s3 = s3Client();

            const paginator = paginateListObjectsV2(
                {
                    client: s3,
                    pageSize: 10,
                },
                { Bucket: env.AWS_S3_BUCKET_NAME },
            );

            for await (const page of paginator) {
                objectContent.push(
                    ...(page.Contents?.map((obj) => {
                        return {
                            Key: obj.Key,
                            size: obj.Size,
                            lastModified: obj.LastModified,
                        };
                    }) || []),
                );
            }

            return res
                .status(200)
                .json({ message: "Files listed successfully", success: true, data: objectContent });
        } catch (error) {
            logger.error("Error listing files:", error);
            return res.status(500).json({
                message: "Error listing files",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}

export default FileHandlerController;
