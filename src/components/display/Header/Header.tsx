import React, { FC, RefObject } from "react";
import { HeaderContainer, HeaderMessageContainer } from "./Header.styles";
import { useMobile } from "../../../lib/state/atoms/view";
import Emoji from "../../util/Emoji/Emoji";

export interface HeaderProps {
    headerRef: RefObject<HTMLDivElement>;
}

const Header: FC<HeaderProps> = (p) => {
    const isMobile = useMobile();

    return (
        <HeaderContainer isMobile={isMobile} ref={p.headerRef}>
            <HeaderMessageContainer isMobile={isMobile}>
                <Emoji emoji="👋" size={70} />
                <p>Hi! I am a full stack web developer from Scotland</p>
            </HeaderMessageContainer>
        </HeaderContainer>
    );
};

export default Header;
