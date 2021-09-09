import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../lib/api/trpc/router";
import { createContext } from "../../../lib/api/trpc/context";

export default createNextApiHandler({
    router: appRouter,
    createContext,
});
