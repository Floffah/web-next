import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType";
import { nonNull, objectType, stringArg } from "nexus";
import axios from "axios";
import { OauthUserDetails } from "../../../util/discord";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { generateAccessTokens } from "../../../util/auth";

export const AccessTokens = objectType({
    name: "AccessTokens",
    description:
        "Object containing a user's refresh and access token after login",
    definition: (t) => {
        t.string("access", { description: "Access token" });
        t.string("refresh", { description: "Refresh token" });
    },
});

export const LoginMutationFields = (t: ObjectDefinitionBlock<"Mutation">) => {
    t.field("getAccess", {
        description: "Get access codes from the discord oauth process",
        type: AccessTokens,
        args: {
            access_token: nonNull(
                stringArg({ description: "Discord access token" }),
            ),
        },
        resolve: async (_s, a, c) => {
            const d = await axios.get(OauthUserDetails, {
                headers: {
                    Authorization: `Bearer ${a.access_token}`,
                },
                responseType: "json",
            });

            if (
                !d ||
                !d.data ||
                typeof d.data.id !== "string" ||
                typeof d.data.username !== "string"
            )
                throw new AuthenticationError(
                    "No data or id returned from discord",
                );

            const { access, refresh } = generateAccessTokens();

            const user = await c.db.user.upsert({
                create: {
                    discordId: d.data.id,
                    access,
                    refresh,
                    username: d.data.username,
                },
                update: {
                    access,
                    refresh,
                },
                where: {
                    discordId: d.data.id,
                },
            });

            return {
                access: user.access,
                refresh: user.refresh,
            };
        },
    });

    t.field("refresh", {
        description: "Refresh your session and get new access tokens",
        type: AccessTokens,
        args: {
            refresh: nonNull(stringArg({ description: "Your refresh token" })),
            access: nonNull(
                stringArg({
                    description:
                        "Your access token. Must pass this as well for security purposes",
                }),
            ),
        },
        resolve: async (_s, a, c) => {
            const user = await c.db.user.findUnique({
                where: {
                    access: a.access,
                    refresh: a.refresh,
                },
            });

            if (!user)
                throw new UserInputError("Invalid refresh and/or access token");

            const { access, refresh } = generateAccessTokens();

            await c.db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    access,
                    refresh,
                },
            });

            return { access, refresh };
        },
    });
};
