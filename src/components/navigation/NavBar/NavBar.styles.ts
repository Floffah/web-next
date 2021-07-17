import styled from "styled-components";
import Image from "next/image";
import { ThemeProps } from "../../../lib/themes/styles";

export const NavBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
`;

export const NavBarTitleArea = styled.div``;

export const NavBarFloffahIcon = styled(Image)`
    border-radius: 50%;
    display: inline-block;
`;

export const NavBarFloffahTitle = styled.p<ThemeProps>`
    display: inline-block;
    color: ${(props) => props.theme.front};
    font-weight: 800;
    font-size: 28px;
    margin: 6px 0 0 15px;
`;
