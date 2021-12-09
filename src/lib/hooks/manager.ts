import { useContext } from "react";
import { ManagerContext } from "../state/Manager";

export function useManager() {
    return useContext(ManagerContext);
}
