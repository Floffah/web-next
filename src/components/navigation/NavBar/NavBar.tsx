import React, { FC } from "react";
import {
    NavBarContainer,
    NavBarFloffahTitle,
    NavBarTitleArea,
} from "./NavBar.styles";
// import floffahIcon from "/public/android-chrome-512x512.png";

const NavBar: FC = (_p) => {
    return (
        <NavBarContainer>
            <NavBarTitleArea>
                {/*<NavBarFloffahIcon src={floffahIcon} height={50} width={50} />*/}
                <NavBarFloffahTitle>Floffah</NavBarFloffahTitle>
            </NavBarTitleArea>
        </NavBarContainer>
    );
};

export default NavBar;
