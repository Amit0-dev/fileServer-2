import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env";
import { logger } from "../logger";

export const s3Client = () => {
    console.log(env)
    try {
        return new S3Client({
            region: env.AWS_REGION,
            credentials: {
                accessKeyId: env.AWS_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            },
        });
    } catch (error) {
        logger.error("Error creating S3 client:", error);
        throw new Error("Failed to create S3 client");
    }
};
