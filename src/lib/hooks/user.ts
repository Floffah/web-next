import { useContext } from "react";
import { ManagerContext } from "../state/Manager";

export function useSelf() {
    const manager = useContext(ManagerContext);

    return manager.currentUser;
}
