import styled from "styled-components";
import tw from "twin.macro";

export const InlineAlertTitle = styled.p`
    * {
        ${tw`inline-block`}
    }
`;

export const InlineAlertContent = styled.p`
    a {
        ${tw`text-blue-300`}
    }
`;
