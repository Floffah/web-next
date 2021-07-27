import cryptoRandomString from "crypto-random-string";

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
