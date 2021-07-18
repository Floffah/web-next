import styled from "styled-components";
import { ThemeProps } from "../../../lib/themes/styles";
import { shift } from "../../../lib/themes/resolve";

export const HeaderContainer = styled.div<ThemeProps>`
    height: 300px;
    width: 100%;
    background-color: ${(p) => shift(p.theme.shiftback, 0.04, p.theme.back)};
`;
