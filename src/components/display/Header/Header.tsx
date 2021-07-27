import React, { FC, RefObject } from "react";
import { useMobile } from "../../../lib/state/atoms/view";
import Emoji from "../../util/Emoji/Emoji";

export interface HeaderProps {
    headerRef: RefObject<HTMLDivElement>;
}

const Header: FC<HeaderProps> = (p) => {
    const isMobile = useMobile();

    return (
        <div
            ref={p.headerRef}
            className={
                "bg-gray-900 w-full overflow-hidden " +
                (isMobile ? "h-fit" : "h-72")
            }
        >
            <div
                className={
                    "relative mx-auto center " +
                    (isMobile
                        ? "block mt-14 text-center"
                        : "flex items-center justify-center mt-28 text-left")
                }
            >
                <Emoji
                    emoji="👋"
                    size={70}
                    className={isMobile ? "block" : "inline-block"}
                />
                <p
                    className={
                        "relative text-4xl " +
                        (isMobile ? "block ml-0 mb-12" : "inline-block ml-3.5")
                    }
                >
                    Hi! I am a full stack web developer from Scotland
                </p>
            </div>
        </div>
    );
};

export default Header;
