import { inferAsyncReturnType, router } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export async function createContext(ctx: CreateNextContextOptions) {
    const session = await getSession({ req: ctx.req, ctx });

    return {
        prisma,
        session,
    };
}

export type ContextType = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
    return router<ContextType>();
}
