import { inferAsyncReturnType, router } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/client";
import { prisma } from "../db";

export async function createContext(ctx: CreateNextContextOptions) {
    const session = await getSession({ req: ctx.req });

    return {
        prisma,
        session,
    };
}

export type ContextType = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
    return router<ContextType>();
}
