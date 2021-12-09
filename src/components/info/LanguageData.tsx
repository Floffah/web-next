import { languages } from "../../lib/info/languages";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LanguageDataDetails } from "./LanguageData.styles";
import { c } from "../../lib/util/class";
import { Hint, useHint } from "../../lib/hooks/hints";
import { Icon } from "@mdi/react";
import { mdiCursorDefaultClickOutline } from "@mdi/js";

export default function LanguageData() {
    const [selected, setSelected] = useState<null | keyof typeof languages>(
        null,
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const ntabs = Object.keys(languages).length;
    const { hintShown, dismissHint } = useHint(Hint.LanguagesClick);

    return (
        <div
            className={c(
                "bg-gradient-to-b from-gray-900 to-gray-950 transition-all w-full sm:!w-128 h-fit",
                selected === null ? "rounded-t-lg" : "rounded-lg",
            )}
            ref={containerRef}
        >
            {hintShown && (
                <Icon
                    path={mdiCursorDefaultClickOutline}
                    className="absolute top-2 right-2 text-white animate-pulse"
                    size={0.7}
                />
            )}
            <h1 className="text-lg pt-2 text-gray-400 text-center">
                Languages
            </h1>
            <div>
                {(Object.keys(languages) as (keyof typeof languages)[]).map(
                    (k, i) => (
                        <div
                            className="relative inline-block h-fit select-none cursor-pointer"
                            style={{ width: `calc(100% / ${ntabs})` }}
                            key={i}
                            onClick={() => {
                                if (hintShown) dismissHint();
                                if (selected === k) setSelected(null);
                                else setSelected(k);
                            }}
                        >
                            <div
                                className={c(
                                    "absolute bottom-0 w-full transition-all",
                                    selected === k ? "h-full" : "h-0.5",
                                )}
                                style={{ backgroundColor: languages[k].colour }}
                            />
                            <p className="relative text-center px-3 py-2">
                                {k}
                            </p>
                        </div>
                    ),
                )}
            </div>
            <div
                className={c(
                    "w-full transition-all overflow-y-auto overflow-x-none",
                    selected ? "h-44" : "h-0",
                )}
            >
                {selected && (
                    <LanguageDataDetails className="text-gray-400 p-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {languages[selected].details}
                        </ReactMarkdown>
                    </LanguageDataDetails>
                )}
            </div>
        </div>
    );
}
