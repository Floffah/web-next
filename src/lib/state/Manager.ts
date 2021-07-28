import { NexusGenRootTypes } from "../api/types/typegen";
import { Client } from "urql";
import { isLoggedIn } from "../api/util/auth-client";
import gql from "graphql-tag";
import { createContext } from "react";

export const ManagerContext = createContext<Manager>(null as any);

export class Manager {
    currentUser?: NexusGenRootTypes["User"];
    client: Client;

    constructor(client: Client) {
        this.client = client;

        if (isLoggedIn()) {
            this.client
                .query(
                    gql`
                        query GetSelf {
                            me {
                                id
                                discordId
                                username
                                roleId
                            }
                        }
                    `,
                )
                .toPromise()
                .then((d) => {
                    if (d.data && d.data.me) this.currentUser = d.data.me;
                });
        }
    }
}
