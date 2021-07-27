import React, { FC } from "react";
import { withDefaultUrql } from "../../lib/api/urql/urql";
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

export default withDefaultUrql()(DashPage);
