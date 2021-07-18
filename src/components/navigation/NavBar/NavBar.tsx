import React, { FC } from "react";
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

const NavBar: FC = (_p) => {
    const [isToggled, toggle] = useToggle(false);
    const [, setMagicRequested] = useAtom(magicRequestedAtom);
    const router = useRouter();

    if (isToggled)
        setTimeout(() => {
            if (isToggled) {
                setMagicRequested(true);
                router.push("/magic");
            }
        }, 2000);

    return (
        <NavBarContainer>
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
