import { makeSchema } from "nexus";
import { resolve } from "path";

export const APISchema = makeSchema({
    types: [],
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
