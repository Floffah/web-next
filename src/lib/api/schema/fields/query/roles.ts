import { enumType, intArg, nonNull, objectType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";
import { UserInputError } from "apollo-server-micro";

export const Permission = enumType({
    name: "Permission",
    description: "Role permissions",
    members: ["ADMINISTRATOR", "EDIT_PRODUCTS"],
});

export const Role = objectType({
    name: "Role",
    description: "GraphQL object representing a service role",
    definition: (t) => {
        t.nonNull.int("id", { description: "Role ID" });
        t.nonNull.string("name", { description: "Role name" });

        t.nonNull.list.nonNull.field("permissions", {
            type: Permission,
        });
    },
});

export const RoleFields = (t: ObjectDefinitionBlock<"Query">) => {
    t.field("getRole", {
        description: "Get a specific role",
        type: Role,
        args: {
            id: nonNull(intArg({ description: "Role id to query" })),
        },
        resolve: async (_s, a, c) => {
            const role = await c.db.role.findUnique({
                where: {
                    id: a.id,
                },
            });

            if (!role) throw new UserInputError(`No such role of id "${a.id}"`);

            return {
                id: role.id,
                name: role.name,

                permissions: role.permissions,
            };
        },
    });
};
