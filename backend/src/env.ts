import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().optional(),
    DATABASE_URL: z.string(),
    RESEND_API_KEY: z.string(),
    JWT_SECRET: z.string(),
    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
});

function createEnv(env: NodeJS.ProcessEnv) {
    const validationResult = envSchema.safeParse(env);

    if (!validationResult.success) {
        console.error("Environment variable validation failed:", validationResult.error);
        throw new Error("Invalid environment variables");
    } else {
        return validationResult.data;
    }
}

export const env = createEnv(process.env);
