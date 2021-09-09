import { createRouter } from "../context";
import { z } from "zod";
import { guests } from "../sanitize";

export const rolesRouter = createRouter().query("get", {
    input: z.object({
        id: z.number(),
    }),
    resolve: async (a) => {
        const role = await a.ctx.prisma.role.findUnique({
            where: {
                id: a.input.id,
            },
        });
        if (!role) throw `No such role of id "{a.input.id}"`;

        return guests.sanitizeRole(role);
    },
});
