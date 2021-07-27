import React, { forwardRef, HTMLAttributes } from "react";
import Image from "next/image";
import Twemoji from "twemoji";

export interface EmojiProps {
    size?: number;
    png?: boolean;
    emoji: string;
}

export const TwemojiURL = `https://twemoji.maxcdn.com/v/latest`;
// export const DataBlurEmoji =
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAARVBMVEVHcEw7iMM7iMM7iMM7iMM7iMP///9sptLO4fC20ulUl8udxOFgns7a6fQ7iMPz+PuFtdrC2uypy+VHj8eRvN3n8Ph4rdZhf4NlAAAABnRSTlMAv+9gIM+kpfmZAAAB20lEQVR4Xt3Y227DIAyA4XRtbXMmPb3/o04Lm1hmiK3C1f7r5FMkBAGWr86nONDpvJQu1zjY9bI5H3G4jy/pGid0XZZznNJ5Oc2BTkuclAa621HIZkNQSmSyfQ+ytyf86XmzGsj/ZpCgGaEMkakmQTfyIgQ/koPDnAAFKJIPIBT8IQSwSZhALKEEgcmgKvch2wLS6nDLrYlJHQg5Y3ZjjWYnoRoybGbY31TyHeghj8x+REMHcjvHxE6mSk4BPSKPf7lvQsQ+SJRIgCSpjh62oACSxB9dWxCAWvLwkxUgSTJ84JbuDCHKDGAPBw7h99urcxnxXgD5kyyD7uVtZS82d5f4XglKt1FohRKNQg5KqQlZxIfVQQjfMYgCbOEoBPA/oECjkM2ItrlCJjYNVXGIoLSOQjcopVEow3cvDcAnOl+PjPx2dm4lqmPTWbNt18hE8CfLIadcYvcd7ka8IAlQXNlCLEuhBaH671ijHcT/tQ9BEiCv30Q0/2s1p9vWyFAMuo1W7dGBfFJt/WrYgSIKm1E1FLN2e8x3I0xSlcvnxS6kP0IYAdIeajYpHEH6Y5YBEiDtwc8IkP4o6ucfjuXjelIf1+UqIEPjTbtkmXbtM+siatrV2LzLumnXh58fkO/Lo6a6oQAAAABJRU5ErkJggg==";

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
                // blurDataURL: DataBlurEmoji,
            }}
            // placeholder="blur"
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
