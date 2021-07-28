import React, { FC } from "react";
import { NextSeo } from "next-seo";
import NavBar from "../../components/navigation/NavBar/NavBar";

const DashPage: FC = () => {
    return (
        <>
            <NextSeo title="Home" />
            <NavBar forceBackground={true} />
        </>
    );
};

export default DashPage;
