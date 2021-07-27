import React, { FC, useEffect } from "react";
import Magic from "../components/fun/Magic/Magic";
import { useAtom } from "jotai";
import { isMagicAtom } from "../lib/state/atoms/magic";
import { useRouter } from "next/router";

const MagicPage: FC = () => {
    const [isMagic] = useAtom(isMagicAtom);
    const router = useRouter();

    useEffect(() => {
        if (!isMagic) {
            router.push("/");
        }
    }, [router, isMagic]);

    return (
        <>
            <Magic />
        </>
    );
};

export default MagicPage;
