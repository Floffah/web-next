import { useCallback, useEffect, useState } from "react";

export function useStorage(keys?: string[], clear?: boolean) {
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        const storageListener = (e: StorageEvent) => {
            if (!keys) return forceUpdate();
            if (e.key && keys.includes(e.key)) return forceUpdate();
            if (clear && !e.key) return forceUpdate();
        };

        window.addEventListener("storage", storageListener);

        return () => {
            window.removeEventListener("storage", storageListener);
        };
    });
}
