import React, { FC } from "react";
import { useAtom } from "jotai";
import { commissionSelectedAtom } from "../../../lib/state/atoms/commissions";
import Emoji from "../../util/Emoji/Emoji";
import { useMobile } from "../../../lib/state/atoms/view";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../../lib/api/trpc/router";

export interface CommissionsProsAndConsProps {
    products?: inferProcedureOutput<
        AppRouter["_def"]["queries"]["products.list"]
    >["items"];
    fetching?: boolean;
}

const CommissionsProsAndCons: FC<CommissionsProsAndConsProps> = (p) => {
    const [commissionSelected] = useAtom(commissionSelectedAtom);
    const isMobile = useMobile();

    if (p.fetching || !p.products) return <></>;

    const commission = p.products.find((p) => p.id === commissionSelected);
    if (!commission) return <></>;

    return (
        <div className="absolute top-40 h-fit w-fit translate-center-x">
            <div
                className={
                    "align-top border-solid border-gray-600 " +
                    (isMobile
                        ? "block pt-0 px-0 pb-3 m-0 border-b"
                        : "inline-block border-r pr-2.5")
                }
            >
                {commission.pros.map((p, id) => (
                    <div key={id} className="whitespace-nowrap">
                        <Emoji
                            emoji="✅"
                            size={22}
                            className="inline-block align-top"
                        />
                        <span className="relative inline-block ml-1.5 whitespace-normal max-w-md">
                            {p}
                        </span>
                    </div>
                ))}
            </div>
            <div
                className={
                    "align-top " +
                    (isMobile
                        ? "block border-none p-0 mb-0 mx-0 mt-4"
                        : "inline-block pl-2.5")
                }
            >
                {commission.cons.map((p, id) => (
                    <div key={id} className="whitespace-nowrap">
                        <Emoji
                            emoji="❌"
                            size={22}
                            className="inline-block align-top"
                        />
                        <span className="relative inline-block ml-1.5 whitespace-normal max-w-md">
                            {p}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommissionsProsAndCons;
