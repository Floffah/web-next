import { connectionPlugin, makeSchema, mutationType, queryType } from "nexus";
import { resolve } from "path";
import { Product, ProductFields } from "./fields/query/products";
import { AccessTokens, LoginMutationFields } from "./fields/mutation/login";
import { User, UserFields } from "./fields/query/users";
import { Permission, Role, RoleFields } from "./fields/query/roles";

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
            resolve: () => "pong",
            description: "For checking api latency",
        });

        ProductFields(t);
        UserFields(t);
        RoleFields(t);
    },
});

export const APISchema = makeSchema({
    types: [
        // query objects
        Query,
        Product,
        User,
        Permission,
        Role,

        // mutation objects
        Mutation,
        AccessTokens,
    ],
    plugins: [connectionPlugin()],
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
