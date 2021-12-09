import { createRouter } from "../context";
import { TRPCError } from "@trpc/server";
import { sanitizeAPIUser } from "../../sanitize/user";

export const usersRouter = createRouter().query("self", {
    resolve: async (a) => {
        console.log(a.ctx.session);
        if (!a.ctx.session || !a.ctx.session.user)
            throw new TRPCError({
                message: "Must have a session and user",
                code: "UNAUTHORIZED",
            });

        const user = await a.ctx.prisma.user.findUnique({
            where: {
                id: a.ctx.session.user.id,
            },
            include: {
                role: true,
            },
        });

        if (!user)
            throw new TRPCError({
                message: "Unexpectedly fount no user",
                code: "INTERNAL_SERVER_ERROR",
            });

        return sanitizeAPIUser(user, true, true);
    },
});
