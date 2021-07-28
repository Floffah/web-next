import { objectType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";
import { AuthenticationError } from "apollo-server-micro";

export const User = objectType({
    name: "User",
    description: "GraphQL object representing a service user",
    definition: (t) => {
        t.nonNull.int("id", { description: "User ID" });
        t.nonNull.id("discordId", { description: "User's Discord ID" });

        t.nonNull.string("username", { description: "User's username" });

        t.int("roleId", { description: "User's role ID" });
    },
});

export const UserFields = (t: ObjectDefinitionBlock<"Query">) => {
    t.field("me", {
        type: User,
        description: "Gets the current authenticated user",
        resolve: (_s, _a, c) => {
            if (!c.authenticated || !c.user)
                throw new AuthenticationError(
                    "Must be authenticated to get self object",
                );

            return {
                id: c.user.id,
                discordId: c.user.discordId,

                username: c.user.username,

                roleId: c.user.roleId,
            };
        },
    });
};
