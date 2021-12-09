import { useState } from "react";

export function useForceRender() {
    const [value, setValue] = useState(0);
    return () => setValue(value === 500 ? 0 : value + 1);
}
