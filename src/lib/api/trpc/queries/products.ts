import { createRouter } from "../context";
import { z } from "zod";

export const productRouter = createRouter().query("list", {
    input: z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
    }),
    resolve: async (a) => {
        const limit = a.input.limit ?? 50;

        const items = await a.ctx.prisma.product.findMany({
            take: limit + 1,
            cursor: a.input.cursor ? { id: a.input.cursor } : undefined,
            orderBy: {
                id: "asc",
            },
            select: {
                id: true,
                name: true,
                pros: true,
                cons: true,
            },
        });

        let nextCursor: typeof a.input.cursor | null = null;
        if (items.length > limit) {
            const nextItem = items.pop();
            nextCursor = nextItem?.id;
        }

        return {
            items,
            nextCursor,
        };
    },
});
