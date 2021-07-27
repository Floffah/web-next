import {
    cacheExchange,
    ClientOptions,
    dedupExchange,
    fetchExchange,
    makeOperation,
} from "urql";
import { withUrqlClient } from "next-urql";
import { authExchange } from "@urql/exchange-auth";
import { ApiRefreshName, ApiTokenName } from "../../util/storage/localstorage";
import gql from "graphql-tag";

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
    exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange<{ access: string; refresh: string }>({
            getAuth: async (auth) => {
                if (typeof localStorage !== "undefined") {
                    const access = localStorage.getItem(ApiTokenName);
                    const refresh = localStorage.getItem(ApiRefreshName);
                    if (!auth.authState) {
                        if (access) {
                            return {
                                access,
                                refresh,
                            };
                        }
                    }

                    if (access && refresh) {
                        const refreshResult = await auth.mutate(
                            gql`
                                mutation Refresh(
                                    $access: String!
                                    $refresh: String!
                                ) {
                                    refresh(
                                        access: $access
                                        refresh: $refresh
                                    ) {
                                        access
                                        refresh
                                    }
                                }
                            `,
                            {
                                access,
                                refresh,
                            },
                        );

                        if (
                            refreshResult.data?.refresh &&
                            refreshResult.data?.access
                        ) {
                            localStorage.setItem(
                                ApiTokenName,
                                refreshResult.data.access,
                            );
                            localStorage.setItem(
                                ApiRefreshName,
                                refreshResult.data.refresh,
                            );
                            return refreshResult.data;
                        }
                    }
                }

                return null;
            },
            addAuthToOperation: (auth) => {
                if (!auth.authState) {
                    return auth.operation;
                }

                const fetchOptions =
                    typeof auth.operation.context.fetchOptions === "function"
                        ? auth.operation.context.fetchOptions()
                        : auth.operation.context.fetchOptions || {};

                return makeOperation(auth.operation.kind, auth.operation, {
                    ...auth.operation.context,
                    fetchOptions: {
                        ...fetchOptions,
                        headers: {
                            ...fetchOptions.headers,
                            Authorization: `ACCESS ${auth.authState.access}`,
                        },
                    },
                });
            },
            didAuthError: (err) => {
                return err.error.graphQLErrors.some((e) =>
                    e.message.toLowerCase().includes("invalid access"),
                );
            },
        }),
        fetchExchange,
    ],
};

export const withDefaultUrql = () => withUrqlClient(() => UrqlOpts);
