import InlineAlert from "../feedback/InlineAlert/InlineAlert";
import Button from "../input/Button";
import { useEffect, useState } from "react";
import { UseCookiesName } from "../../lib/util/storage/localstorage";
import { deleteAllCookies } from "../../lib/cookies";

export default function RenderSaver() {
    const [cookieVisible, setCookieVisible] = useState(false);

    useEffect(() => {
        let useCookies = localStorage.getItem(UseCookiesName);

        if (useCookies === null) setCookieVisible(true);
        else if (useCookies === "false") deleteAllCookies();

        let lastCookie = document.cookie;

        const cookieCheckInterval = setInterval(() => {
            useCookies = localStorage.getItem(UseCookiesName);
            if (useCookies !== "true" && lastCookie !== document.cookie) {
                deleteAllCookies();
                lastCookie = document.cookie;
            }
        }, 100);

        return () => {
            clearInterval(cookieCheckInterval);
        };
    }, []);

    return (
        <>
            {cookieVisible && (
                <div className="fixed bottom-5 w-full">
                    <InlineAlert
                        title="Cookie notice"
                        className="w-10/12 absolute block translate-center-x bottom-0"
                    >
                        <span className="inline-block">
                            This site uses cookies.
                        </span>
                        <div className="absolute right-0 top-6 right-5 inline-block">
                            <Button
                                className="bg-blue-600"
                                onClick={() => {
                                    localStorage.setItem(
                                        UseCookiesName,
                                        "true",
                                    );
                                    setCookieVisible(false);
                                }}
                            >
                                Accept
                            </Button>
                            <Button
                                className="ml-3 bg-blue-600"
                                onClick={() => {
                                    localStorage.setItem(
                                        UseCookiesName,
                                        "false",
                                    );
                                    deleteAllCookies();
                                    setCookieVisible(false);
                                }}
                            >
                                Decline
                            </Button>
                        </div>
                    </InlineAlert>
                </div>
            )}
        </>
    );
}
