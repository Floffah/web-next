import styled from "styled-components";
import { ThemeProps } from "../../../lib/themes/styles";
import { shift } from "../../../lib/themes/resolve";
import Emoji from "../../util/Emoji/Emoji";

export const HeaderContainer = styled.div<ThemeProps>`
    height: 300px;
    width: 100%;
    background-color: ${(p) => shift(p.theme.shiftback, 0.04, p.theme.back)};
`;

export const HeaderWaveEmoji = styled(Emoji)``;

export const HeaderMessageContainer = styled.div`
    position: relative;
    margin: auto;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        display: inline-block;
    }

    span:nth-child(2) {
        vertical-align: 17px;
        font-size: 35px;
        margin-left: 15px;
    }
`;
