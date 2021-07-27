import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { APISchema } from "../../lib/api/schema/schema";
import { executor } from "../../lib/api/schema/execute";
import { MicroContext } from "../../lib/api/types/context";
import { NextApiHandler } from "next";
import queryComplexity, { simpleEstimator } from "graphql-query-complexity";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

require("ts-tiny-invariant");

const db = new PrismaClient();

const apollo = new ApolloServer({
    schema: APISchema,
    executor: executor(APISchema),
    introspection: true,
    validationRules: [
        queryComplexity({
            estimators: [simpleEstimator({ defaultComplexity: 1 })],
            maximumComplexity: 50,
        }),
    ],
    // plugins:
    //     process.env.NODE_ENV === "development"
    //         ? [ApolloServerPluginLandingPageGraphQLPlayground()]
    //         : undefined,
    context: async (c: MicroContext) => {
        return { db, req: c.req };
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default (async (req: any, res: any, next: any) => {
    if (!res.socket.server.apollo) {
        await apollo.start();
        res.socket.server.apollo = apollo.createHandler({
            path: "/api/graphql",
        });
    }

    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com,http://localhost:3000,https://floffah.dev,https://*.floffah.dev",
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    return await res.socket.server.apollo(req, res, next);
}) as NextApiHandler;
