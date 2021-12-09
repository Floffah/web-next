import { createRouter } from "./context";
import { productRouter } from "./queries/products";
import { rolesRouter } from "./queries/roles";
import { usersRouter } from "./queries/users";

export const appRouter = createRouter()
    .merge("products.", productRouter)
    .merge("roles.", rolesRouter)
    .merge("users.", usersRouter);

export type AppRouter = typeof appRouter;
