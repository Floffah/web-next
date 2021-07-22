import React, { FC, RefObject } from "react";
import { CommissionsHeaderContainer } from "./CommissionsHeader.styles";

export interface CommissionsHeaderProps {
    headerRef: RefObject<HTMLDivElement>;
}

const CommissionsHeader: FC<CommissionsHeaderProps> = (p) => {
    return <CommissionsHeaderContainer ref={p.headerRef}/>
}

export default CommissionsHeader;