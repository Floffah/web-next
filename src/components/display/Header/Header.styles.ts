import styled, { css } from "styled-components";
import { ThemeProps } from "../../../lib/themes/styles";
import { shift } from "../../../lib/themes/resolve";

export const HeaderContainer = styled.div<ThemeProps & { isMobile: boolean }>`
    height: ${(p) => (p.isMobile ? "calc(fit-content + 100px)" : "300px")};
    width: 100%;
    background-color: ${(p) => shift(p.theme.shiftback, 0.04, p.theme.back)};
    overflow-y: auto;
    overflow-x: hidden;
`;

export const HeaderMessageContainer = styled.div<{ isMobile: boolean }>`
    position: relative;
    margin: ${(p) => (p.isMobile ? "55" : "100")}px auto auto auto;
    ${(p) =>
        p.isMobile
            ? "display: block;"
            : css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
              `}
    text-align: ${(p) => (p.isMobile ? "center" : "left")};

    & div {
        display: ${(p) => (p.isMobile ? "block" : "inline-block")};
    }

    p {
        position: relative;
        display: ${(p) => (p.isMobile ? "block" : "inline-block")};
        vertical-align: 17px;
        ${(p) => (p.isMobile ? "top: -20px;" : "")}
        font-size: 35px;
        margin-left: ${(p) => (p.isMobile ? "0" : "15px")};
    }
`;
