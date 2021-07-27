import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ClientOnlyPortal: FC<{ selector: string }> = (p) => {
    const ref = useRef<Element>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector(p.selector) ?? undefined;
        setMounted(true);
    }, [p.selector]);

    return mounted && ref.current
        ? createPortal(p.children, ref.current)
        : null;
};

export default ClientOnlyPortal;
