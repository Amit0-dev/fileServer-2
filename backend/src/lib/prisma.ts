import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { env } from "../env";

const connectionString: string = env.DATABASE_URL;

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString,
    }),
});

export { prisma };
