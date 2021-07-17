import React, { FC } from "react";
import { NextSeo } from "next-seo";
import NavBar from "../components/navigation/NavBar/NavBar";

const IndexPage: FC = (_p) => {
    return (
        <>
            <NextSeo title="Home" />
            <NavBar />
        </>
    );
};

export default IndexPage;
