import styled from "styled-components";
import { ThemeProps } from "../../../lib/themes/styles";
import { shift } from "../../../lib/themes/resolve";

export const InlineAlertContainer = styled.div<ThemeProps>`
    background-color: ${(p) => shift(p.theme.shiftback, 0.4, p.theme.primary)};
    border: 1px solid ${(p) => shift(p.theme.shiftback, 0.2, p.theme.primary)};
    padding: 7px 10px;
    position: relative;
    width: fit-content;
    height: fit-content;
    border-radius: 5px;
`;

export const InlineAlertTitle = styled.h1`
    margin: 0 0 7px 0;
    color: ${(p) => shift(p.theme.shiftfront, 0.15, p.theme.primary)};
    font-size: 27px;
    padding-bottom: 2px;
    border-bottom: 1px solid
        ${(p) => shift(p.theme.shiftback, 0.2, p.theme.primary)};

    * {
        display: inline-block;
    }
`;

export const InlineAlertContent = styled.p`
    margin: 0;
    color: #ffffff;

    a {
        color: ${(p) => shift(p.theme.shiftfront, 0.15, p.theme.primary)};
        text-decoration: none;
    }
`;
