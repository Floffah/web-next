const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    important: true,
    darkMode: "class",
    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US",
    },
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        // "./src/styles/**/*.{css,less,sass,scss}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                "2:5xl": "1.688rem",
            },

            width: {
                fit: "fit-content",
            },
            height: {
                fit: "fit-content",
            },
            margin: {
                1.25: "0.3125rem",
            },

            verticalAlign: {
                4: "1rem",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["checked"],
            borderColor: ["checked"],
            inset: ["checked"],
            zIndex: ["hover", "active"],
        },
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
    },
};
