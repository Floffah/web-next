import styled from "styled-components";
import tw from "twin.macro";

export const StyledScrollbar = styled.div`
    ::-webkit-scrollbar {
        ${tw`w-1`}
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
    }

    ::-webkit-scrollbar-thumb {
        ${tw`bg-gray-700 rounded-full`}
    }
`;
