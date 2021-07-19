import React, { FC, RefObject, useEffect, useState } from "react";
import {
    NavBarContainer,
    NavBarFloffahTitle,
    NavBarTitleArea,
    NavBarTitleMagicLetter,
} from "./NavBar.styles";
import { useToggle } from "react-use";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { magicRequestedAtom } from "../../../lib/state/atoms/magic";
// import floffahIcon from "/public/android-chrome-512x512.png";

export interface NavBarProps {
    headerRef?: RefObject<HTMLDivElement>;
    forceBackground?: boolean;
}

const NavBar: FC<NavBarProps> = (p) => {
    const [isToggled, toggle] = useToggle(false);
    const [, setMagicRequested] = useAtom(magicRequestedAtom);
    const [hasBackground, setHasBackground] = useState(false);
    const router = useRouter();

    if (isToggled)
        setTimeout(() => {
            if (isToggled) {
                setMagicRequested(true);
                router.push("/magic");
            }
        }, 2000);

    useEffect(() => {
        if (!p.forceBackground) {
            const isPast = () =>
                p.headerRef &&
                p.headerRef.current &&
                window.scrollY >
                    p.headerRef.current.offsetTop +
                        p.headerRef.current.offsetHeight;

            const resizeListener = () => {
                const past = isPast();
                if (!hasBackground && past) setHasBackground(true);
                else if (hasBackground && !past) setHasBackground(false);
            };

            window.addEventListener("resize", resizeListener);

            return () => {
                window.removeEventListener("resize", resizeListener);
            };
        }
        return;
    }, [hasBackground, p.headerRef, p.forceBackground]);

    return (
        <NavBarContainer hasBackground={p.forceBackground ?? hasBackground}>
            <NavBarTitleArea>
                {/*<NavBarFloffahIcon src={floffahIcon} height={50} width={50} />*/}
                <NavBarFloffahTitle doingMagic={isToggled}>
                    <span>Fl</span>
                    <NavBarTitleMagicLetter onClick={() => toggle()}>
                        o
                    </NavBarTitleMagicLetter>
                    <span>ffah</span>
                </NavBarFloffahTitle>
            </NavBarTitleArea>
        </NavBarContainer>
    );
};

export default NavBar;
