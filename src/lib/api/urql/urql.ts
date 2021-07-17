import {
    cacheExchange,
    ClientOptions,
    dedupExchange,
    fetchExchange,
} from "urql";
import { withUrqlClient } from "next-urql";

export const UrqlOpts: ClientOptions = {
    url:
        typeof window === "undefined"
            ? `http${
                  process.env.NODE_ENV === "development"
                      ? "://localhost:3000"
                      : "s://floffah.dev"
              }/api/graphql`
            : `${window.location.protocol}//${window.location.hostname}${
                  window.location.port !== "" ? ":" + window.location.port : ""
              }/api/graphql`,
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
};

export const withDefaultUrql = () => withUrqlClient(() => UrqlOpts);
