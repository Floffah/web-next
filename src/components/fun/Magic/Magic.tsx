import React, { FC, useEffect, useRef } from "react";
import { MagicCanvas } from "./Magic.styles";

function noise(ctx: CanvasRenderingContext2D) {
    if (ctx) {
        const w = ctx.canvas.width,
            h = ctx.canvas.height,
            idata = ctx.createImageData(w, h),
            buffer32 = new Uint32Array(idata.data.buffer),
            len = buffer32.length;

        let i = 0;

        for (; i < len; ) buffer32[i++] = ((255 * Math.random()) | 0) << 24;

        ctx.putImageData(idata, 0, 0);
    }
}

const resize = (ctx: CanvasRenderingContext2D | undefined | null) => {
    if (ctx) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
};

const Magic: FC = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const ctx = ref.current?.getContext("2d");

    useEffect(() => {
        const resizeListener = () => resize(ctx);

        window.addEventListener("resize", resizeListener);

        resize(ctx);

        let doRender = false;
        let cleaningUp = false;

        const loop = () => {
            doRender = !doRender;
            if (!doRender) {
                requestAnimationFrame(loop);
                return;
            }
            if (cleaningUp) return;
            noise(ctx as CanvasRenderingContext2D); // set as a dependency, never null
            requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cleaningUp = true;
            window.removeEventListener("resize", resizeListener);
        };
    }, [ctx, ref]);

    return (
        <MagicCanvas
            className="fixed w-full h-full"
            ref={ref}
            style={{
                display: ref.current ? "block" : "none",
            }}
        />
    );
};

export default Magic;
