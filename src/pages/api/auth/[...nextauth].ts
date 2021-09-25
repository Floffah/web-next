import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Providers from "next-auth/providers";
import { ClientID, ClientSecret } from "../../../lib/api/util/discord";
import { prisma } from "../../../lib/api/db";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Providers.Discord({
            clientId: ClientID,
            clientSecret: ClientSecret,
        }),
    ],
});
