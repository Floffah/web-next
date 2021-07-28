import React, { FC, RefObject, useEffect, useState } from "react";
import { NavBarFloffahTitle } from "./NavBar.styles";
import { useToggle } from "react-use";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isMagicAtom } from "../../../lib/state/atoms/magic";
import { isLoggedIn } from "../../../lib/api/util/auth-client";
import { useStorage } from "../../../lib/hooks/storage";
import { ApiTokenName } from "../../../lib/util/storage/localstorage";

// import floffahIcon from "/public/android-chrome-512x512.png";

export interface NavBarProps {
    headerRef?: RefObject<HTMLDivElement>;
    forceBackground?: boolean;
}

const NavBar: FC<NavBarProps> = (p) => {
    const [isToggled, toggle] = useToggle(false);
    const [, setMagic] = useAtom(isMagicAtom);
    const [hasBackground, setHasBackground] = useState(false);
    const router = useRouter();

    useStorage([ApiTokenName]);

    if (isToggled) {
        router.prefetch("/magic", undefined, { priority: true });
        setTimeout(() => {
            if (isToggled) {
                setMagic(true);
                router.push("/magic");
            }
        }, 2000);
    }

    useEffect(() => {
        if (!p.forceBackground) {
            const isPast = () =>
                p.headerRef &&
                p.headerRef.current &&
                window.scrollY >
                    p.headerRef.current.offsetTop +
                        p.headerRef.current.offsetHeight;

            const scrollListener = () => {
                const past = isPast();
                if (!hasBackground && past) setHasBackground(true);
                else if (hasBackground && !past) setHasBackground(false);
            };

            window.addEventListener("scroll", scrollListener);

            return () => {
                window.removeEventListener("resize", scrollListener);
            };
        }
        return;
    }, [hasBackground, p.headerRef, p.forceBackground]);

    return (
        <div
            className={
                "fixed top-0 left-0 w-full h-12 transition-all z-50 overflow-hidden " +
                (p.forceBackground ?? hasBackground
                    ? "bg-gray-900"
                    : "bg-transparent")
            }
        >
            <div>
                <NavBarFloffahTitle
                    doingMagic={isToggled}
                    className="inline-block text-gray-400 font-extrabold text-2:5xl mt-1.25 ml-3.5 select-none"
                >
                    <span
                        onClick={() => router.push("/")}
                        style={{ cursor: "pointer" }}
                    >
                        Fl
                    </span>
                    <span
                        onClick={() => toggle()}
                        className="transition-colors cursor-pointer hover:text-blue-500"
                    >
                        o
                    </span>
                    <span
                        onClick={() => router.push("/")}
                        style={{ cursor: "pointer" }}
                    >
                        ffah
                    </span>
                </NavBarFloffahTitle>
                <div className="float-right relative">
                    <span
                        className="inline-block select-none cursor-pointer text-xl mt-2.5 mr-3.5"
                        onClick={() => {
                            if (isLoggedIn()) router.push("/dash");
                            else router.push("/api/login/discordoauth");
                        }}
                    >
                        {isLoggedIn() ? "Dashboard" : "Login"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
