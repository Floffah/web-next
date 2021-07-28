import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";
import { objectType } from "nexus";
import { connectionFromArray, cursorToOffset } from "graphql-relay";

export const Product = objectType({
    name: "Product",
    description: "GraphQL object representing a commission product",
    definition: (t) => {
        t.nonNull.int("id", { description: "Product ID" });
        t.nonNull.string("name", { description: "Product name" });

        t.nonNull.list.nonNull.string("pros", {
            description: "Product pros list",
        });
        t.nonNull.list.nonNull.string("cons", {
            description: "Product cons list",
        });
    },
});

export const ProductFields = (t: ObjectDefinitionBlock<"Query">) => {
    t.connectionField("products", {
        type: Product,
        description: "Connection array of products",
        resolve: async (_r, a, c, _i) => {
            let take: number | undefined = undefined;

            if (a.first) take = a.first;
            else if (a.last) take = a.last * -1;

            if (take && a.before) take = take * -1;

            let skip = 1;

            if (a.after) skip += cursorToOffset(a.after);

            if (a.after) console.log(cursorToOffset(a.after));

            if (take) take++;

            return connectionFromArray(
                await c.db.product.findMany({
                    take,
                    skip: skip === 1 ? undefined : skip,
                    select: {
                        id: true,
                        name: true,

                        pros: true,
                        cons: true,
                    },
                }),
                a,
            );
        },
    });
};
