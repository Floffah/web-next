import { atom } from "jotai";
import { isMobile } from "react-device-detect";
import { useAtom } from "jotai";

export const isMobileAtom = atom(
    typeof window !== "undefined"
        ? window.innerWidth <= 940 ?? isMobile
        : isMobile,
);

export const useMobile = () => {
    const [isMobile] = useAtom(isMobileAtom);

    return isMobile;
};
