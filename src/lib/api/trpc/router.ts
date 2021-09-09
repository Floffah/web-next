import { createRouter } from "./context";
import { productRouter } from "./queries/products";
import { rolesRouter } from "./queries/roles";

export const appRouter = createRouter()
    .merge("products.", productRouter)
    .merge("roles.", rolesRouter)
    .merge("users.", rolesRouter);

export type AppRouter = typeof appRouter;
