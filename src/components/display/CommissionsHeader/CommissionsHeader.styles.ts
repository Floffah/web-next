import styled, { css } from "styled-components";
import tw from "twin.macro";

export const CommissionsHeaderProductTab = styled.p<{ selected: boolean }>`
    ${(p) =>
        p.selected
            ? css`
                  ${tw`border-b-2 border-solid border-gray-500`}
                  font-weight: 700;
              `
            : undefined}
`;
