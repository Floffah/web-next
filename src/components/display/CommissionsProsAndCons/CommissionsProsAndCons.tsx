import React, { FC } from "react";
import { useAtom } from "jotai";
import { commissionSelectedAtom } from "../../../lib/state/atoms/commissions";
import Emoji from "../../util/Emoji/Emoji";
import { useMobile } from "../../../lib/state/atoms/view";
import { AppRouter } from "../../../lib/api/trpc/router";
import { inferProcedureOutput } from "@trpc/server";
import Button from "../../input/Button";

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
    if (!commission)
        return (
            <p className="absolute top-56 h-fit w-fit translate-center-x text-gray-500 text-lg select-none">
                No data
            </p>
        );

    return (
        <>
            <div className="absolute top-40 h-fit max-w-10/12 w-fit translate-center-x">
                <div
                    className={
                        "align-top border-solid border-gray-600 w-fit " +
                        (isMobile
                            ? "block pt-0 px-0 pb-3 m-0 border-b"
                            : "inline-block border-r pr-2.5")
                    }
                >
                    {commission.pros.map((p, id) => (
                        <div
                            key={id}
                            className="whitespace-nowrap max-w-10/12 sm:!max-w-none w-fit"
                        >
                            <Emoji
                                emoji="✅"
                                size={22}
                                className="relative inline-block align-top"
                            />
                            <p className="m-0 relative inline-block ml-1.5 whitespace-pre-line">
                                {p}
                            </p>
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
                        <div
                            key={id}
                            className="whitespace-nowrap max-w-10/12 sm:!max-w-none w-fit"
                        >
                            <Emoji
                                emoji="❌"
                                size={22}
                                className="relative inline-block align-top"
                            />
                            <p className="m-0 relative inline-block ml-1.5 whitespace-pre-line">
                                {p}
                            </p>
                        </div>
                    ))}
                </div>
                <Button className="relative block mx-auto mt-5">
                    Calculate your price
                </Button>
            </div>
        </>
    );
};

export default CommissionsProsAndCons;
