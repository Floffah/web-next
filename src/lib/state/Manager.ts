import { createContext } from "react";

export const ManagerContext = createContext<Manager>(null as any);

export class Manager {}
