import { NextApiHandler } from "next";
import { createClient } from "urql";
import gql from "graphql-tag";
import {
    ApiRefreshName,
    ApiTokenName,
} from "../../../lib/util/storage/localstorage";
import { UrqlOpts } from "../../../lib/api/urql/urql";

const urql = createClient(UrqlOpts);

const handler: NextApiHandler = async (req, res) => {
    if (Object.prototype.hasOwnProperty.call(req.query, "access_token")) {
        if (!req.query.expires_in || !req.query.access_token)
            res.status(400).send({
                error: "Must pass expires_in and access_token query parameters",
            });

        const expires = parseInt(<string>req.query.expires_in);

        if (isNaN(expires))
            res.status(400).send({ error: "expires_in must be a number" });

        let data;

        try {
            data = await urql
                .query(
                    gql`
                        mutation GetAccess($access_token: String!) {
                            getAccess(access_token: $access_token) {
                                access
                                refresh
                            }
                        }
                    `,
                    {
                        access_token: req.query.access_token,
                    },
                )
                .toPromise();
        } catch (e) {
            res.redirect("/");
            return;
        }

        if (data.error) {
            res.status(400).send({ error: data.error });
            return;
        }

        res.setHeader("Content-Type", "text/html").send(`
            <html lang="en">
                <head>
                    <html>
                        <title> Saving... </title>
                    </html>
                </head>
                <body>
                    <noscript>You need to enable javasript to log in with discord</noscript>
                    <script>
                        localStorage.setItem("${ApiTokenName}", "${data.data.getAccess.access}");
                        localStorage.setItem("${ApiRefreshName}", "${data.data.getAccess.refresh}");
                        window.location.href = "/";
                    </script>
                </body>
            </html>
        `);
    } else {
        res.setHeader("Content-Type", "text/html").send(`
            <html lang="en">
                <head>
                    <html>
                        <title> Processing... </title>
                    </html>
                </head>
                <body>
                    <noscript>You need to enable javascript to log in with discord</noscript>
                    <script>
                        if (window.location.hash.length > 0) {
                            window.location.replace("/api/login/discord?" + window.location.hash.replace(/^#/, ""))
                        } else {
                            window.location.replace("/");
                        }
                    </script>
                </body>
            </html>
        `);
    }
};

export default handler;
