import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().optional(),
    DATABASE_URL: z.string(),
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
