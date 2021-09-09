import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";

export const guests = {
    sanitizeRole(
        role: inferAsyncReturnType<
            typeof PrismaClient["prototype"]["role"]["findUnique"]
        >,
    ) {
        if (role === null) return null;

        return {
            id: role.id,
            name: role.name,

            permissions: role.permissions,
        };
    },
};
