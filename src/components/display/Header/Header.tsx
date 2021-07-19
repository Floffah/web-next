import React, { FC } from "react";
import {
    HeaderContainer,
    HeaderMessageContainer,
    HeaderWaveEmoji,
} from "./Header.styles";

const Header: FC = () => {
    return (
        <HeaderContainer>
            <HeaderMessageContainer>
                <p>
                    <span>
                        <HeaderWaveEmoji emoji="👋" size={70} />
                    </span>
                    <span>
                        Hi! I am a full stack web developer from Scotland
                    </span>
                </p>
            </HeaderMessageContainer>
        </HeaderContainer>
    );
};

export default Header;
