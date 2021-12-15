import React, { CSSProperties, FC, ReactNode } from "react";

export interface InlineAlertProps {
    title: string | ReactNode;
    className?: string;
    style?: CSSProperties;
}

const InlineAlert: FC<InlineAlertProps> = (p) => {
    return (
        // <div
        //     className="bg-blue-900 border border-blue-700 px-2.5 py-1.5 relative w-fit h-fit rounded-md"
        //     style={p.style}
        // >
        //     <InlineAlertTitle className="my-0 mb-2 text-blue-300 text-2:5xl pb-0.5 border-b border-blue-700">
        //         {p.title}
        //     </InlineAlertTitle>
        //     <InlineAlertContent className="my-0 text-white text-decoration-none">
        //         {p.children}
        //     </InlineAlertContent>
        // </div>
        <div
            className={
                "bg-green-600 border-green-800 text-green-200 border-l-4 p-4 w-fit " +
                p.className
            }
            role="alert"
        >
            <div className="font-bold">{p.title}</div>
            <div>{p.children}</div>
        </div>
    );
};

export default InlineAlert;
