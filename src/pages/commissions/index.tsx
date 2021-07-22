import React, { FC, useRef } from "react";
import CommissionsHeader from "../../components/display/CommissionsHeader/CommissionsHeader";
import NavBar from "../../components/navigation/NavBar/NavBar";

const CommissionsPage: FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <NavBar headerRef={headerRef} />
            <CommissionsHeader headerRef={headerRef} />
        </>
    );
};

export default CommissionsPage;
