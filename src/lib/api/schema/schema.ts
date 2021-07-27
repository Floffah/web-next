import {
    connectionPlugin,
    makeSchema,
    mutationType,
    queryComplexityPlugin,
    queryType,
} from "nexus";
import { resolve } from "path";
import { Product, ProductFields } from "./fields/query/products";
import { AccessTokens, LoginMutationFields } from "./fields/mutation/login";

const Mutation = mutationType({
    description: "Mutation",
    definition: (t) => {
        LoginMutationFields(t);
    },
});

const Query = queryType({
    description: "Query",
    definition: (t) => {
        t.string("ping", {
            complexity: 0,
            resolve: () => "pong",
            description: "For checking api latency",
        });

        ProductFields(t);
    },
});

export const APISchema = makeSchema({
    types: [
        // query objects
        Query,
        Product,

        // mutation objects
        Mutation,
        AccessTokens,
    ],
    plugins: [queryComplexityPlugin(), connectionPlugin()],
    contextType: {
        module: resolve(
            __dirname,
            "../../../../src/lib/api/types",
            "context.ts",
        ),
        export: "QueryContext",
    },
    outputs:
        process.env.NODE_ENV === "production"
            ? {}
            : {
                  schema: resolve(__dirname, "../../../../", "schema.graphql"),
                  typegen: resolve(
                      __dirname,
                      "../../../../src/lib/api/types",
                      "typegen.ts",
                  ),
              },
});
