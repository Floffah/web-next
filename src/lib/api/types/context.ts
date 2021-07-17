import { ServerResponse } from "http";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { PrismaClient } from "@prisma/client";

export interface MicroContext {
    req: MicroRequest;
    res: ServerResponse;
    connection: any;
}

export interface BaseQueryContext {
    db: PrismaClient;
    req: MicroRequest;
    authenticated: boolean;
    user?: any;
}

export interface UnauthenticatedQueryContext extends BaseQueryContext {
    authenticated: false;
    user: undefined;
}

export interface AuthenticatedQueryContext extends BaseQueryContext {
    authenticated: true;
    user: any;
}

export type QueryContext =
    | UnauthenticatedQueryContext
    | AuthenticatedQueryContext;
