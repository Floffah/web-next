import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Providers from "next-auth/providers";
import { ClientID, ClientSecret } from "../../../lib/api/util/discord";

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Providers.Discord({
            clientId: ClientID,
            clientSecret: ClientSecret,
        }),
    ],
});
