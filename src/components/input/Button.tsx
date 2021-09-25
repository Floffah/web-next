import { PropsWithChildren } from "react";

export default function Button(p: PropsWithChildren<{ className?: string }>) {
    let common =
        "py-1 px-4 w-fit mb-1 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ";

    if (p.className) common += p.className + " ";

    return (
        <button
            className={
                common +
                "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white"
            }
        >
            {p.children}
        </button>
    );
}
