import styled, { css, keyframes } from "styled-components";
import tw from "twin.macro";

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

const glitching = css`
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
        ${tw`bg-gray-900`}
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

export const NavBarFloffahTitle = styled.p<{ doingMagic: boolean }>`
    ${(p) => (p.doingMagic ? glitching : "")}
`;
