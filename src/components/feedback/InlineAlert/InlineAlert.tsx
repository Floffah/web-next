import React, { CSSProperties, FC, ReactNode } from "react";
import {
    InlineAlertContainer,
    InlineAlertContent,
    InlineAlertTitle,
} from "./InlineAlert.styles";

export interface InlineAlertProps {
    title: string | ReactNode;
    className?: string;
    style?: CSSProperties;
}

const InlineAlert: FC<InlineAlertProps> = (p) => {
    return (
        <InlineAlertContainer className={p.className} style={p.style}>
            <InlineAlertTitle>{p.title}</InlineAlertTitle>
            <InlineAlertContent>{p.children}</InlineAlertContent>
        </InlineAlertContainer>
    );
};

export default InlineAlert;
