import React, { FC, useEffect } from "react";
import Magic from "../components/fun/Magic/Magic";
import { useAtom } from "jotai";
import { magicRequestedAtom } from "../lib/state/atoms/magic";
import { useRouter } from "next/router";

const MagicPage: FC = () => {
    const [magicRequested] = useAtom(magicRequestedAtom);
    const router = useRouter();

    useEffect(() => {
        if (!magicRequested) {
            router.push("/");
        }
    }, [router, magicRequested]);

    return (
        <>
            <Magic />
        </>
    );
};

export default MagicPage;
