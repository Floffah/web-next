import { useState } from "react";

export enum Hint {
    LanguagesClick,
}

export function useHint(hint: Hint) {
    const hintName = "Hint" + Hint[hint];
    const [hintShown, setHintShown] = useState(
        typeof localStorage !== "undefined"
            ? localStorage.getItem(hintName) !== "dismissed"
            : false,
    );

    return {
        dismissHint: () => {
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(hintName, "dismissed");
            }
            setHintShown(false);
        },
        hintShown,
    };
}
