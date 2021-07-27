import { NextApiHandler } from "next";
import { getAuthoriseURL } from "../../../lib/api/util/discord";

const handler: NextApiHandler = (req, res) => {
    res.redirect(
        getAuthoriseURL(
            req.headers.host ?? "https://next.floffah.dev",
            ["identify"],
            process.env.NODE_ENV === "production",
        ),
    );
};

export default handler;
