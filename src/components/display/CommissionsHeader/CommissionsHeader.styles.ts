import styled from "styled-components";
import { shift } from "../../../lib/themes/resolve";
import { ThemeProps } from "../../../lib/themes/styles";

export const CommissionsHeaderContainer = styled.div<ThemeProps>`
    height: 300px;
    width: 100%;
    background-color: ${(p) => shift(p.theme.shiftback, 0.04, p.theme.back)};
    overflow-y: auto;
    overflow-x: hidden;
`;