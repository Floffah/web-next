import React, { FC, useRef } from "react";
import { NextSeo } from "next-seo";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/display/Header/Header";
import InlineAlert from "../components/feedback/InlineAlert/InlineAlert";
import Link from "next/link";
import Emoji from "../components/util/Emoji/Emoji";
import styled from "styled-components";

const IndexPage: FC = (_p) => {
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <NextSeo title="Home" />
            <NavBar headerRef={headerRef} />
            <Header headerRef={headerRef} />
            <CommissionsAlert
                style={{
                    margin: "30px auto auto auto",
                }}
                title={
                    <>
                        <Emoji emoji="‼" />
                        Commissions are open!
                        <Emoji emoji="‼" />
                    </>
                }
            >
                See the <Link href="/commissions">Commissions Dashboard</Link>{" "}
                for more info!
            </CommissionsAlert>
        </>
    );
};

const CommissionsAlert = styled(InlineAlert)`
    h1 {
        text-align: center;

        div {
            position: relative;
            top: 2px;
        }
    }

    h1 div:nth-child(1) {
        margin-right: 5px;
    }

    h1 div:nth-child(2) {
        margin-left: 5px;
    }

    p {
        text-align: center;
    }
`;

export default IndexPage;
