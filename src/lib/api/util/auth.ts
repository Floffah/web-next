import cryptoRandomString from "crypto-random-string";
import { QueryContext } from "../types/context";
import { PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server-micro";

export function generateAccessTokens() {
    const access = cryptoRandomString({
        length: 50,
        type: "alphanumeric",
    });
    const refresh = cryptoRandomString({
        length: 50,
        type: "alphanumeric",
    });

    return { access, refresh };
}

export async function getClientContext(
    db: PrismaClient,
    params: any,
    fallbackparams?: any,
    isSubscription?: boolean,
): Promise<Partial<QueryContext>> {
    const context: Partial<QueryContext> = {
        authenticated: false,
        user: undefined,
    };

    let fulltoken = params.authorization as string | undefined;

    if (!fulltoken) {
        for (const k of Object.keys(params)) {
            if (k.toLowerCase() === "authorization") {
                fulltoken = params[k];
            }
        }
    }
    if (!fulltoken && fallbackparams) {
        for (const k of Object.keys(fallbackparams)) {
            if (k.toLowerCase() === "authorization") {
                fulltoken = fallbackparams[k];
            }
        }
    }
    if (!fulltoken) return context;

    if (fulltoken.startsWith("ACCESS ")) {
        const access = fulltoken.replace("ACCESS ", "");
        const user = await db.user.findUnique({
            where: {
                access,
            },
        });
        if (user) {
            return {
                authenticated: true,
                user,
            };
        } else {
            if (isSubscription) {
                return {
                    authenticated: false,
                    user: undefined,
                };
            } else throw new UserInputError("Invalid access code");
        }
    }
    return context;
}
