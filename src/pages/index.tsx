import React, { FC } from "react";
import { NextSeo } from "next-seo";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/display/Header/Header";

const IndexPage: FC = (_p) => {
    return (
        <>
            <NextSeo title="Home" />
            <NavBar />
            <Header />
        </>
    );
};

export default IndexPage;
