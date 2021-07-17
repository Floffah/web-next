import { AppComponent } from "next/dist/next-server/lib/router/router";
import React from "react";
import { DefaultSeo } from "next-seo";
import { ApplyGlobalStyles } from "../lib/themes/styles";
import { OneDarkTheme } from "../lib/themes/one-dark";

const App: AppComponent = (p) => {
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
            <ApplyGlobalStyles theme={OneDarkTheme}>
                <p.Component {...p.pageProps} />
            </ApplyGlobalStyles>
        </>
    );
};

export default App;
