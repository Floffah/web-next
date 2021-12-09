import { useManager } from "./manager";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function useSelf() {
    const manager = useManager();
    const session = useSession();

    useEffect(() => {
        if (!manager.initiallyTriedSelf) {
            manager.initiallyTriedSelf = true;
            if (session.data) manager.canRequestSelf = true;
            manager.isRequestingSelf = true;
        }
    }, [session, manager]);
}
