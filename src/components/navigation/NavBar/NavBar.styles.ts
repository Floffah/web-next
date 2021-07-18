import styled, { css, keyframes } from "styled-components";
import Image from "next/image";
import { ThemeProps } from "../../../lib/themes/styles";
import { shift } from "../../../lib/themes/resolve";

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

const cssLoop = (
    steps: number,
    update: (i: number, props?: any) => string,
    props?: any,
) => {
    let styles = "";

    for (let i = 0; i < steps; i++) {
        styles += update(i, props);
    }

    return css`
        ${styles}
    `;
};

const random = (max: number, min = 0) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const glitchEffect1 = keyframes`
${cssLoop(
    30,
    (i) => `
        ${i * (1 / 30) * 100}% {
            clip: rect(${random(150)}px, 350px, ${random(150)}px, 30px);
        }
    `,
)}
`;

const glitchEffect2 = keyframes`
${cssLoop(
    30,
    (i) => `
        ${i * (1 / 30) * 100}% {
            clip: rect(${random(150)}px, 350px, ${random(150)}px, 30px);
        }
    `,
)}
`;

const glitching = css<ThemeProps>`
    &::before,
    &::after {
        color: ${(p) => p.theme.front};
        content: "Floffah";
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        top: 0;
        pointer-events: none;
        margin: 6px 0 0 15px;
        background-color: ${(p) =>
            shift(p.theme.shiftback, 0.04, p.theme.back)};
    }

    &::before {
        left: 3px;
        text-shadow: -2px 0 red;
        animation: ${glitchEffect1};
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-delay: 0s;
        animation-direction: alternate-reverse;
    }

    &::after {
        left: -3px;
        text-shadow: -2px 0 blue;
        animation: ${glitchEffect2};
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-delay: 0s;
        animation-direction: alternate-reverse;
    }
`;

export const NavBarFloffahTitle = styled.p<
    ThemeProps & { doingMagic: boolean }
>`
    display: inline-block;
    color: ${(props) => props.theme.front};
    font-weight: 800;
    font-size: 28px;
    margin: 6px 0 0 15px;
    user-select: none;

    ${(p) => (p.doingMagic ? glitching : "")}
`;

export const NavBarTitleMagicLetter = styled.span<ThemeProps>`
    transition: color 0.25s;
    cursor: pointer;

    &:hover {
        color: ${(p) => p.theme.primary};
    }
`;
