import http from "http";
import { env } from "./env";
import { logger } from "./logger";
import { createApp } from "./app";

async function main() {
    try {
        const PORT: number = +(env.PORT ?? 3000);

        const server = http.createServer(createApp());

        server.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error("Failed to start the server", { error });
    }
}

main();
