import React, { FC, RefObject, useEffect } from "react";
import { CommissionsHeaderProductTab } from "./CommissionsHeader.styles";
import { useAtom } from "jotai";
import { commissionSelectedAtom } from "../../../lib/state/atoms/commissions";
import { AppRouter } from "../../../lib/api/trpc/router";
import { inferProcedureOutput } from "@trpc/server";

export interface CommissionsHeaderProps {
    headerRef: RefObject<HTMLDivElement>;
    products?: inferProcedureOutput<
        AppRouter["_def"]["queries"]["products.list"]
    >["items"];
    fetching?: boolean;
}

const CommissionsHeader: FC<CommissionsHeaderProps> = (p) => {
    const [commissionSelected, setCommissionSelected] = useAtom(
        commissionSelectedAtom,
    );

    useEffect(() => {
        if (
            !p.fetching &&
            p.products &&
            !commissionSelected &&
            p.products.length > 0
        )
            setCommissionSelected(p.products[0].id);
    }, [commissionSelected, p.fetching, p.products, setCommissionSelected]);

    return (
        <div
            ref={p.headerRef}
            className="h-36 w-full bg-gray-900 overflow-hidden absolute"
        >
            <div className="absolute bottom-0 left-0 w-full h-fit">
                {p.products?.map((p, id) => (
                    <CommissionsHeaderProductTab
                        className="inline-block m-0 pt-0 px-2.5 pb-1.5 cursor-pointer select-none"
                        key={id}
                        selected={commissionSelected === p.id}
                        onClick={() => {
                            if (commissionSelected !== p.id)
                                setCommissionSelected(p.id);
                        }}
                    >
                        {p.name}
                    </CommissionsHeaderProductTab>
                ))}
            </div>
        </div>
    );
};

export default CommissionsHeader;
