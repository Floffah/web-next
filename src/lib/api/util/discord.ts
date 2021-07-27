export const OauthAuthorise = "https://discord.com/api/oauth2/authorize";
export const OauthToken = "https://discord.com/api/oauth2/token";
export const OauthUserDetails = "https://discord.com/api/users/@me";

export const ClientID = process.env.CLIENT_ID;
export const ClientSecret = process.env.CLIENT_SECRET;
export const getRedirectURI = (host: string, doH?: boolean, s?: boolean) =>
    `${doH ? (s ? "https://" : "http://") : ""}${host}/api/login/discord`;

export const getAuthoriseURL = (host: string, scope: string[], s?: boolean) => {
    if (!ClientID) throw "No client id provided";

    const query = new URLSearchParams({
        client_id: ClientID,
        redirect_uri: getRedirectURI(host, !host.startsWith("http"), s),
        response_type: "token",
        scope: scope.join(" "),
    }).toString();

    return encodeURI(`${OauthAuthorise}?${decodeURIComponent(query)}`);
};
