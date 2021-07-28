import React, { FC, useRef } from "react";
import { NextSeo } from "next-seo";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/display/Header/Header";
import InlineAlert from "../components/feedback/InlineAlert/InlineAlert";
import Link from "next/link";
import Emoji from "../components/util/Emoji/Emoji";

const IndexPage: FC = (_p) => {
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <NextSeo title="Home" />
            <NavBar headerRef={headerRef} />
            <Header headerRef={headerRef} />
            <InlineAlert
                className="relative mx-auto mt-7 text-center"
                title={
                    <>
                        <Emoji emoji="‼" size={20} className="relative top-1" />
                        &nbsp; Commissions are open! &nbsp;
                        <Emoji emoji="‼" size={20} className="relative top-1" />
                    </>
                }
            >
                See the <Link href="/commissions">Commissions Dashboard</Link>{" "}
                for more info!
            </InlineAlert>
        </>
    );
};
export default IndexPage;
