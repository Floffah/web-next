import React, { FC } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Theme } from "./theme";
import { shift } from "./resolve";

export type ThemeProps = { theme: Theme };

export const GlobalStyles = createGlobalStyle<ThemeProps>`
    body, html, .sb-show-main #root {
        position: absolute;
        margin: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: ${(props) => props.theme.back};
        font-family: 'Poppins', sans-serif;
        text-rendering: optimizeLegibility;
        image-rendering: smooth;
        color-rendering: optimizeQuality;
        shape-rendering: crispEdges;
    }

    p, span, li {
        color: ${(props) => props.theme.front};
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${(props) =>
            shift(props.theme.shiftback, 0.12, props.theme.front)};
    }

    a {
        color: ${(props) => props.theme.primary};
        cursor: pointer;

        &:active {
            color: ${(props) =>
                shift(props.theme.shiftback, 0.15, props.theme.primary)};
        }
    }
`;

export const ApplyGlobalStyles: FC<{ theme: Theme }> = (p) => {
    return (
        <>
            <ThemeProvider theme={p.theme}>
                <GlobalStyles />
                {p.children}
            </ThemeProvider>
        </>
    );
};
