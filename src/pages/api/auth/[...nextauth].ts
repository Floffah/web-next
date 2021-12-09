import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { ClientID, ClientSecret } from "../../../lib/api/util/discord";
import { prisma } from "../../../lib/api/db";
import Discord from "next-auth/providers/discord";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Discord({
            clientId: ClientID,
            clientSecret: ClientSecret,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session(params) {
            return {
                ...params.session,
                user: { ...params.user, id: params.user.id },
            };
        },
    },
});
