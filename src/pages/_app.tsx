import React, { FC, useEffect, useMemo } from "react";
import { DefaultSeo } from "next-seo";
import { useAtom } from "jotai";
import { isMobileAtom } from "../lib/state/atoms/view";
import { ApiTokenName } from "../lib/util/storage/localstorage";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import { Manager, ManagerContext } from "../lib/state/Manager";
import "../styles/common.css";
import { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../lib/api/trpc/router";
import ErrorBoundary from "../components/util/ErrorBoundary";
import { Provider } from "next-auth/client";
import { StyledScrollbar } from "../styles/Scrollbar";
// import "tailwindcss/tailwind.css";

const App: FC<AppProps> = (p) => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useAtom(isMobileAtom);
    const manager = useMemo(() => new Manager(), []);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            !isMobile &&
            window.innerWidth <= 940
        )
            setIsMobile(true);

        const resizeListener = () => {
            if (!isMobile && window.innerWidth <= 940) setIsMobile(true);
            else if (isMobile && window.innerWidth > 940) setIsMobile(false);
        };

        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, [isMobile, setIsMobile]);

    useHotkeys(
        "CTRL+SHIFT+L",
        () => {
            if (localStorage.getItem(ApiTokenName) === null) {
                router.push("/api/login/discordoauth");
            } else {
                router.push("/dash");
            }
        },
        {
            enabled: true,
            filter: () => true,
            filterPreventDefault: true,
        },
    );

    return (
        <>
            <DefaultSeo
                titleTemplate="%s | Floffah"
                defaultTitle="Floffah"
                description="Floffah's personal site"
                openGraph={{
                    locale: "en",
                    url: "https://floffah.dev/?ref=graph",
                    description: "Floffah's personal site",
                    site_name: "Floffah",
                    images: [
                        {
                            url: "/android-chrome-192x192.png",
                            width: 192,
                            height: 192,
                            alt: "Android Chrome 192x icon",
                        },
                        {
                            url: "/favicon.ico",
                            width: 48,
                            height: 48,
                            alt: "Favicon",
                        },
                        {
                            url: "/android-chrome-512x512.png",
                            width: 512,
                            height: 512,
                            alt: "Android Chrome 512x icon",
                        },
                        {
                            url: "/apple-touch-icon.png",
                            width: 180,
                            height: 180,
                            alt: "Apple touch icon",
                        },
                        {
                            url: "/favicon-16x16.png",
                            width: 16,
                            height: 16,
                            alt: "16x favicon (png)",
                        },
                        {
                            url: "/favicon-32x32.png",
                            width: 32,
                            height: 32,
                            alt: "32x favicon (png)",
                        },
                    ],
                }}
            />
            <StyledScrollbar className="fixed w-full h-full my-0 top-0 left-0 bg-gray-800 text-gray-300 transition-all overflow-y-auto">
                <ManagerContext.Provider value={manager}>
                    <p.Component {...p.pageProps} />
                </ManagerContext.Provider>
            </StyledScrollbar>
        </>
    );
};

// export default withDefaultUrql()(App as any);

const TRPCApp = withTRPC<AppRouter>({
    config: (_c) => {
        const url =
            process.env.NODE_ENV === "production"
                ? `https://next.floffah.dev/api/trpc`
                : "http://localhost:3000/api/trpc";

        return {
            url,
        };
    },
})(App);

export default function BoundariedApp(p: AppProps) {
    return (
        <ErrorBoundary>
            <Provider>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <TRPCApp {...p} />
            </Provider>
        </ErrorBoundary>
    );
}
