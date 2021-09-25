import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NODE_ENV !== "production" && !global.prisma) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.prisma = new PrismaClient();
}

export const prisma =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (global.prisma as PrismaClient) ??
    new PrismaClient({ log: ["query", "info", "error", "warn"] });
