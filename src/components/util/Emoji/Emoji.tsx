import React, { forwardRef, HTMLAttributes } from "react";
import Image from "next/image";
import Twemoji from "twemoji";

export interface EmojiProps {
    size?: number;
    png?: boolean;
    emoji: string;
}

export const TwemojiURL = `https://twemoji.maxcdn.com/v/latest`;

export function getEmojiURL(emoji: string, type: "svg" | "72x72" = "svg") {
    if (type === "72x72") {
        return `${TwemojiURL}/72x72/${Twemoji.convert.toCodePoint(emoji)}.png`;
    }
    return `${TwemojiURL}/svg/${Twemoji.convert.toCodePoint(emoji)}.svg`;
}

const Emoji = forwardRef<
    HTMLImageElement,
    HTMLAttributes<HTMLImageElement> & EmojiProps
>((p, ref) => (
    <div className={p.className}>
        <Image
            ref={ref}
            src={{
                src: getEmojiURL(p.emoji, p.png ? "72x72" : "svg"),
                width: p.size ?? 30,
                height: p.size ?? 30,
            }}
            alt="Unnamed Emoji"
            {...(() => {
                const props = { ...p };

                delete props.placeholder;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                delete props.emoji;
                delete props.size;
                delete props.png;
                delete props.className;

                return props as HTMLAttributes<HTMLImageElement> &
                    EmojiProps & {
                        placeholder: undefined;
                        emoji: undefined;
                        size: undefined;
                        png: undefined;
                    };
            })()}
        />
    </div>
));
Emoji.displayName = "Emoji";
Emoji.defaultProps = {
    size: 30,
    png: false,
};

export default Emoji;
