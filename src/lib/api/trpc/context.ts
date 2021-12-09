import { inferAsyncReturnType, router } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function createContext(ctx: CreateNextContextOptions) {
    const session = (await getSession({ req: ctx.req, ctx })) as Session & {
        user: Session["user"] & { id: string };
    };

    return {
        prisma,
        session,
    };
}

export type ContextType = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
    return router<ContextType>();
}
