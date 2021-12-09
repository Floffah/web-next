import { createContext } from "react";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../api/trpc/router";
import { EventEmitter } from "events";
import TypedEventEmitter from "typed-emitter";

export const ManagerContext = createContext<Manager>(null as any);

export interface ManagerEvents {
    selfUpdate: () => void;
}

export const TypedEmitter = EventEmitter as {
    new (): TypedEventEmitter<ManagerEvents>;
};

export class Manager extends TypedEmitter {
    self!: inferProcedureOutput<AppRouter["_def"]["queries"]["users.self"]>;
    isRequestingSelf = false;
    canRequestSelf = false;
    initiallyTriedSelf = false;
}
